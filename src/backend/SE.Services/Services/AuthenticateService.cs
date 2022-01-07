using SE.Core.Models;
using SE.Data;
using SE.Domain.Entities;
using SE.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using SE.Core.Common;
using SE.Core.Mappers;
using MediatR;
using SE.Core.Common.Jwt;
using SE.Core.Common.Exceptions;

namespace SE.Core.Services
{
    //https://jasonwatmore.com/post/2021/06/15/net-5-api-jwt-authentication-with-refresh-tokens
    public interface IAuthenticateService
    {
        public Task<AuthenticatedUserDTO> AuthenticateUser(string userName, string password, string ipAddress, CancellationToken cancelationToken);
        public Task<AuthenticatedTokensDTO> RefreshToken(string token, string ipAddress, CancellationToken cancellationToken);
        public Task<Unit> RevokeToken(string token, string ipAddress, CancellationToken cancellationToken);
    }

    public class AuthenticateService : BaseService, IAuthenticateService
    {
        private readonly DataContext _dataContext;
        private readonly IUserService _userService;
        private readonly IWorkAreaContextService _workAreaContextService;
        private readonly IJwtUtils _jwtUtils;
        private readonly JwtSettings _jwtSettings;

        public AuthenticateService(
            DataContext dataContext, 
            IUserService userService, 
            IWorkAreaContextService workAreaContextService,
                        IJwtUtils jwtUtils,
            IOptions<JwtSettings> jwtSettings)
       
        {
            _dataContext = dataContext;
            _workAreaContextService = workAreaContextService;
            _userService = userService;
            _jwtUtils = jwtUtils;
            _jwtSettings = jwtSettings.Value;
        }

        public async Task<AuthenticatedUserDTO> AuthenticateUser(string userName, string password, string ipAddress, CancellationToken cancellationToken)
        {
            var user = await _dataContext.Users
                .Include(x => x.RefreshTokens)
                .Include(x => x.UserBuildingRoles)
                .Where(x => x.UserName == userName)
                .FirstOrDefaultAsync();
  
            // todo
            //if (user == null || !BCryptNet.Verify(model.Password, user.PasswordHash))
            //    throw new AppException("Username or password is incorrect");

            var accessToken = _jwtUtils.GenerateJwtToken(user);
            var refreshToken = _jwtUtils.GenerateRefreshToken(ipAddress);
            user.RefreshTokens.Add(refreshToken);

            RemoveOldRefreshTokens(user);

            _dataContext.Update(user);
            _dataContext.SaveChanges();

            var workAreaContexts = await _workAreaContextService.GetWorkAreaContextsForUser(user.Id);

            AuthenticatedUserDTO dto = new AuthenticatedUserDTO
            {
                Tokens = new AuthenticatedTokensDTO(accessToken, refreshToken.Token),
                User = user.MapToUserDTO(),
                WorkAreaContexts = workAreaContexts,
                DefaultWorkAreaContextId = workAreaContexts[0].Id,
            };

            return dto;
        }

        public async Task<AuthenticatedTokensDTO> RefreshToken(string token, string ipAddress, CancellationToken cancellationToken)
        {
            var user = await GetUserByRefreshToken(token);
            var refreshToken = user.RefreshTokens.Single(x => x.Token == token);

            if (refreshToken.IsRevoked)
            {
                RevokeDescendantRefreshTokens(refreshToken, user, ipAddress, $"Attempted reuse of revoked ancestor token: {token}");
                _dataContext.Update(user);
                _dataContext.SaveChanges();
            }

            if (!refreshToken.IsActive)
                throw new AppException("Invalid token");

            var newRefreshToken = RotateRefreshToken(refreshToken, ipAddress);
            user.RefreshTokens.Add(newRefreshToken);

            RemoveOldRefreshTokens(user);

            _dataContext.Update(user);
            _dataContext.SaveChanges();

            var jwtToken = _jwtUtils.GenerateJwtToken(user);

            return new AuthenticatedTokensDTO(jwtToken, newRefreshToken.Token);
        }

        public async Task<Unit> RevokeToken(string token, string ipAddress, CancellationToken cancellationToken)
        {
            var user = await GetUserByRefreshToken(token);
            var refreshToken = user.RefreshTokens.Single(x => x.Token == token);

            if (!refreshToken.IsActive)
                throw new AppException("Invalid token");

            RevokeRefreshToken(refreshToken, ipAddress, "Revoked without replacement");
            _dataContext.Update(user);
            _dataContext.SaveChanges();

            return Unit.Value;
        }

        private async Task<User> GetUserByRefreshToken(string token)
        {
            var user = await _dataContext.Users
                .Include(x => x.RefreshTokens)
                .FirstOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == token));

            if (user == null)
                throw new AppException("Invalid token");

            return user;
        }

        private RefreshToken RotateRefreshToken(RefreshToken refreshToken, string ipAddress)
        {
            var newRefreshToken = _jwtUtils.GenerateRefreshToken(ipAddress);
            RevokeRefreshToken(refreshToken, ipAddress, "Replaced by new token", newRefreshToken.Token);
            return newRefreshToken;
        }

        private void RemoveOldRefreshTokens(User user)
        {
            // remove old inactive refresh tokens from user based on TTL in app settings
            user.RefreshTokens.RemoveAll(x =>
                !x.IsActive &&
                x.Created.AddDays(_jwtSettings.RefreshTokenTTL) <= DateTime.UtcNow);
        }

        private void RevokeDescendantRefreshTokens(RefreshToken refreshToken, User user, string ipAddress, string reason)
        {
            // recursively traverse the refresh token chain and ensure all descendants are revoked
            if (!string.IsNullOrEmpty(refreshToken.ReplacedByToken))
            {
                var childToken = user.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken.ReplacedByToken);
                if (childToken.IsActive)
                    RevokeRefreshToken(childToken, ipAddress, reason);
                else
                    RevokeDescendantRefreshTokens(childToken, user, ipAddress, reason);
            }
        }

        private void RevokeRefreshToken(RefreshToken token, string ipAddress, string reason = null, string replacedByToken = null)
        {
            token.Revoked = DateTime.UtcNow;
            token.RevokedByIp = ipAddress;
            token.ReasonRevoked = reason;
            token.ReplacedByToken = replacedByToken;
        }
    }
}
