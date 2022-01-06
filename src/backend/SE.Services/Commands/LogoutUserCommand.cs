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
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace SE.Core.Commands
{
    public class LogoutUserCommandValidator
    : AbstractValidator<LogoutUserCommand>
    {
    }
    
    public record LogoutUserCommand(string Token, string IPAddress, CancellationToken cancellationToken) : IRequest<Unit>;

    public sealed class LogoutUserCommandHandler :
    IRequestHandler<LogoutUserCommand, Unit>
    {
        private readonly DataContext _dataContext;
        private readonly IAuthenticateService _authenticateService;

        public LogoutUserCommandHandler(DataContext dataContext, IAuthenticateService authenticationService)
        {
            _dataContext = dataContext;
            _authenticateService = authenticationService;
        }

        public async Task<Unit> Handle(LogoutUserCommand request, CancellationToken cancellationToken)
        {
            await _authenticateService.RevokeToken(request.Token, request.IPAddress, cancellationToken);
            return Unit.Value;
        }
    }
}
