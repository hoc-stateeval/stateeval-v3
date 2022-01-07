using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SE.Data;
using SE.Domain.Entities;
using SE.Core.Models;
using SE.Core.Common.Exceptions;
using SE.Core.Services;
using SE.Domain.Exceptions;
using SE.Core.Common;

namespace SE.Core.Commands
{
    public class RefreshTokenCommandValidator
    : AbstractValidator<RefreshTokenCommand>
    {
        public RefreshTokenCommandValidator()
        {
            RuleFor(x => x.RefreshToken).NotEmpty();
        }
    }

    public sealed class RefreshTokenCommand :
        IRequest<IResponse<AuthenticatedTokensDTO>>
    {
        public string RefreshToken { get; set; }
        public string IPAddress { get; set; }
        public CancellationToken CancellationToken { get; set; }

        public RefreshTokenCommand(string refreshToken, string ipAddress, CancellationToken cancellationToken)
        {
            RefreshToken = refreshToken;
            IPAddress = ipAddress;
            CancellationToken = cancellationToken;
        }
    }

    public sealed class RefreshTokenCommandHandler :
    IRequestHandler<RefreshTokenCommand, IResponse<AuthenticatedTokensDTO>>
    {
        private readonly DataContext _dataContext;
        private readonly IAuthenticateService _authenticateService;

        public RefreshTokenCommandHandler(DataContext dataContext, IAuthenticateService authenticateService)
        {
            _dataContext = dataContext;
            _authenticateService = authenticateService;
        }

        public async Task<IResponse<AuthenticatedTokensDTO>> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {
            var tokens = await _authenticateService.RefreshToken(request.RefreshToken, request.IPAddress, cancellationToken);
            return Response.Success(tokens);
           
        }
    }
}
