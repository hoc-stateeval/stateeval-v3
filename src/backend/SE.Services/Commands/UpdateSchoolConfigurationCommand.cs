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

namespace SE.Core.Commands
{
    public class UpdateSchoolConfigurationCommandValidator
    : AbstractValidator<UpdateSchoolConfigurationCommand>
    {
        public UpdateSchoolConfigurationCommandValidator()
        {
            RuleFor(x=>x.Id).NotEmpty();
        }
    }
    public sealed class UpdateSchoolConfigurationCommand : 
        IRequest<Unit>
    {
        public long Id { get; }
        public bool IsPrincipalAssignmentDelegated { get; }

        public UpdateSchoolConfigurationCommand(long id, bool isPrincipalAssignmentDelegated)
        {
            Id = id;
            IsPrincipalAssignmentDelegated = isPrincipalAssignmentDelegated;    
        }
    }

    public class UpdateSchoolConfigurationCommandHandler :
    IRequestHandler<UpdateSchoolConfigurationCommand, Unit>
    {
        private readonly DataContext _dataContext;
        public UpdateSchoolConfigurationCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Unit> Handle(UpdateSchoolConfigurationCommand request, CancellationToken cancellationToken)
        {
            SchoolConfiguration? config = await _dataContext.SchoolConfigurations
                   .Where(x => x.Id == request.Id)
                   .FirstOrDefaultAsync();

            if (config == null)
            {
                throw new NotFoundException(nameof(SchoolConfiguration), request.Id);
            }

            config.IsPrincipalAssignmentDelegated = request.IsPrincipalAssignmentDelegated;
            _dataContext.SaveChanges();

            return Unit.Value;
        }
    }
}
