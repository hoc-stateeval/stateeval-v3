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
using SE.Core.Common;

namespace SE.Core.Commands.SchoolConfigurations
{
    public class DelegateEvaluationSetupCommandValidator
    : AbstractValidator<DelegateEvaluationSetupCommand>
    {
        public DelegateEvaluationSetupCommandValidator()
        {
            RuleFor(x=>x.FrameworkContextId).NotEmpty();
        }
    }
    public sealed class DelegateEvaluationSetupCommand :
        IRequest<Unit>
    {
        public long FrameworkContextId { get; }
        public bool DelegateEvalSetup { get; }

        public DelegateEvaluationSetupCommand(long frameworkContextId, bool delegateEvalSetup)
        {
            FrameworkContextId = frameworkContextId;
            DelegateEvalSetup = delegateEvalSetup;
        }
    }

    public class DelegateEvaluationSetupCommandHandler :
    IRequestHandler<DelegateEvaluationSetupCommand, Unit>
    {
        private readonly DataContext _dataContext;
        public DelegateEvaluationSetupCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Unit> Handle(DelegateEvaluationSetupCommand request, CancellationToken cancellationToken)
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
                x.EvaluationSetupDelegated = request.DelegateEvalSetup;
            });

            _dataContext.SaveChanges();

            return Unit.Value;
        }
    }
}
