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
using SE.Core.Common;

namespace SE.Core.Commands.Authentication
{
    public class LoginUserCommandValidator
    : AbstractValidator<LoginUserCommand>
    {
        public LoginUserCommandValidator()
        {
            RuleFor(x=>x.UserName).NotEmpty();
            RuleFor(x => x.Password).NotEmpty();
        }
    }

    public sealed class LoginUserCommand :
    IRequest<IResponse<AuthenticatedUserDTO>>
    {
        public string UserName { get; set; }    
        public string Password { get; set; }
        public string IPAddress { get; set; }
        public CancellationToken CancellationToken { get; set; }

        public LoginUserCommand(string userName, string password, string ipAddress, CancellationToken cancellationToken)
        {
            UserName = userName;
            Password = password;
            IPAddress = ipAddress;
            CancellationToken = cancellationToken;
        }
    }

    public sealed class LoginUserCommandHandler :
    IRequestHandler<LoginUserCommand, IResponse<AuthenticatedUserDTO>>
    {
        private readonly DataContext _dataContext;
        private readonly IAuthenticateService _authenticateService;
        public LoginUserCommandHandler(DataContext dataContext, IAuthenticateService authenticateService)
        {
            _dataContext = dataContext;
            _authenticateService = authenticateService;
        }

        public async Task<IResponse<AuthenticatedUserDTO>> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            var dto = await _authenticateService.AuthenticateUser(request.UserName, request.Password, request.IPAddress, cancellationToken);
            return Response.Success(dto);
        }
    }
}
