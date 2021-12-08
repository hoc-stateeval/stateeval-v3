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
    public class DelegateAssignmentsCommandValidator
    : AbstractValidator<DelegateAssignmentsCommand>
    {
        public DelegateAssignmentsCommandValidator()
        {
            RuleFor(x=>x.FrameworkContextId).NotEmpty();
        }
    }
    public sealed class DelegateAssignmentsCommand :
        IRequest<Unit>
    {
        public long FrameworkContextId { get; }

        public DelegateAssignmentsCommand(long frameworkContextId)
        {
            FrameworkContextId = frameworkContextId;
        }
    }

    public class DelegateAssignmentsCommandHandler :
    IRequestHandler<DelegateAssignmentsCommand, Unit>
    {
        private readonly DataContext _dataContext;
        public DelegateAssignmentsCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Unit> Handle(DelegateAssignmentsCommand request, CancellationToken cancellationToken)
        {
            FrameworkContext? frameworkContext = await _dataContext.FrameworkContexts
                   .Where(x => x.Id == request.FrameworkContextId)
                   .FirstOrDefaultAsync();

            if (frameworkContext == null)
            {
                throw new NotFoundException(nameof(FrameworkContext), request.FrameworkContextId);
            }

            List<SchoolConfiguration> configs = _dataContext.SchoolConfigurations
                .Where(x => x.FrameworkContextId == request.FrameworkContextId).ToList();

            configs.ForEach(x =>
            {
                x.IsPrincipalAssignmentDelegated = true;
            });

            _dataContext.SaveChanges();

            return Unit.Value;
        }
    }
}
