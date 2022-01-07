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
    public class RevokeTokenCommandValidator
    : AbstractValidator<RevokeTokenCommand>
    {
        public RevokeTokenCommandValidator()
        {
            RuleFor(x => x.Token).NotEmpty();
            RuleFor(x => x.IPAdress).NotEmpty();
        }
    }
    
    public record RevokeTokenCommand(string Token, string IPAdress) 
        : IRequest<IResponse<Unit>>;

    public sealed class RevokeTokenCommandHandler :
    IRequestHandler<RevokeTokenCommand, IResponse<Unit>>
    {
        private readonly DataContext _dataContext;
        private readonly IAuthenticateService _authenticateService;

        public RevokeTokenCommandHandler(DataContext dataContext, IAuthenticateService authenticateService)
        {
            _dataContext = dataContext;
            _authenticateService = authenticateService;
        }

        public async Task<IResponse<Unit>> Handle(RevokeTokenCommand request, CancellationToken cancellationToken)
        {
            await _authenticateService.RevokeToken(request.Token, request.IPAdress, cancellationToken);
            return Response.Success(Unit.Value);
        }
    }
}
