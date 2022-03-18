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
    IRequest<AuthenticatedUserDTO>
    {
        public string UserName { get; set; }    
        public string Password { get; set; }
        public string IPAddress { get; set; }

        public LoginUserCommand(string userName, string password)
        {
            UserName = userName;
            Password = password;
        }
    }

    public sealed class LoginUserCommandHandler :
    IRequestHandler<LoginUserCommand, AuthenticatedUserDTO>
    {
        private readonly DataContext _dataContext;
        private readonly IAuthenticateService _authenticateService;
        public LoginUserCommandHandler(DataContext dataContext, IAuthenticateService authenticateService)
        {
            _dataContext = dataContext;
            _authenticateService = authenticateService;
        }

        public async Task<AuthenticatedUserDTO> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            var dto = await _authenticateService.AuthenticateUser(request.UserName, request.Password, request.IPAddress, cancellationToken);
            return dto;
        }
    }
}
