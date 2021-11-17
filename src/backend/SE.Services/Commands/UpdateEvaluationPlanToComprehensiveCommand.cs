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
    public class UpdateEvaluateePlanTypeToComprehensiveCommandValidator
    : AbstractValidator<UpdateEvaluateePlanTypeToComprehensiveCommand>
    {
        public UpdateEvaluateePlanTypeToComprehensiveCommandValidator()
        {
            RuleFor(x => x.UserId).NotEmpty();
            RuleFor(x => x.WorkAreaContextId).NotEmpty();
            RuleFor(x => x.EvaluationId).NotEmpty();
        }
    }
    public sealed class UpdateEvaluateePlanTypeToComprehensiveCommand : 
        IRequest<Unit>
    {
        public long UserId { get; }

        public long WorkAreaContextId { get; }
        public long EvaluationId { get; }

        public UpdateEvaluateePlanTypeToComprehensiveCommand(
            long userId,
            long workAreaContextId,
            long evaluationId)
        {
            UserId = userId;
            WorkAreaContextId = workAreaContextId;
            EvaluationId = evaluationId;
        }
    }

    public class UpdateEvaluateePlanTypeToComprehensiveCommandHandler :
    IRequestHandler<UpdateEvaluateePlanTypeToComprehensiveCommand, Unit>
    {
        private readonly DataContext _dataContext;
        public UpdateEvaluateePlanTypeToComprehensiveCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Unit> Handle(UpdateEvaluateePlanTypeToComprehensiveCommand request, CancellationToken cancellationToken)
        {
            Evaluation? evaluation = await _dataContext.Evaluations
                   .Where(x => x.Id == request.EvaluationId)
                   .FirstOrDefaultAsync();

            if (evaluation == null)
            {
                throw new NotFoundException(nameof(Observation), request.EvaluationId);
            }

            evaluation.EvaluateePlanType = EvaluateePlanType.COMPREHENSIVE;
            evaluation.ComprehensiveCarryForward = false;
            evaluation.ComprehensiveCarryForwardPerformanceLevel = null;
            evaluation.ComprehensiveCarryForwardSchoolYear = null;
            evaluation.FocusedFrameworkNodeId = null;
            evaluation.FocusedSGFrameworkNodeId = null;

            _dataContext.SaveChanges();

            return Unit.Value;
        }
    }
}
