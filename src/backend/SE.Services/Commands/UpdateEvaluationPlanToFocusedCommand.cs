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
    public class UpdateEvaluateePlanTypeToFocusedCommandValidator
    : AbstractValidator<UpdateEvaluateePlanTypeToFocusedCommand>
    {
        public UpdateEvaluateePlanTypeToFocusedCommandValidator()
        {
            RuleFor(x=>x.UserId).NotEmpty();
            RuleFor(x => x.WorkAreaContextId).NotEmpty();
            RuleFor(x => x.EvaluationId).NotEmpty();
        }
    }
    public sealed class UpdateEvaluateePlanTypeToFocusedCommand : 
        IRequest<Unit>
    {
        public long UserId { get; }

        public long WorkAreaContextId { get; }
        public long EvaluationId { get; }
        public long FocusedFrameworkNodeId { get; }
        public long FocusedSGFrameworkNodeId { get; }
        public SchoolYear CarryForwardSchoolYear { get; }
        public RubricPerformanceLevel CarryForwardPerformanceLevel { get;  }

        public UpdateEvaluateePlanTypeToFocusedCommand(
            long userId,
            long workAreaContextId,
            long evaluationId, 
            long focusedFrameworkNodeId,
            long focusedSGFrameworkNodeId,
            SchoolYear carryForwardSchoolYear,
            RubricPerformanceLevel carryForwardPerformanceLevel)
        {
            UserId = userId;
            WorkAreaContextId = workAreaContextId;
            EvaluationId = evaluationId;
            FocusedFrameworkNodeId = focusedFrameworkNodeId;
            FocusedSGFrameworkNodeId = focusedSGFrameworkNodeId;
            CarryForwardPerformanceLevel = carryForwardPerformanceLevel;
            CarryForwardSchoolYear = carryForwardSchoolYear;
        }
    }

    public class UpdateEvaluateePlanTypeToFocusedCommandHandler :
    IRequestHandler<UpdateEvaluateePlanTypeToFocusedCommand, Unit>
    {
        private readonly DataContext _dataContext;
        public UpdateEvaluateePlanTypeToFocusedCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Unit> Handle(UpdateEvaluateePlanTypeToFocusedCommand request, CancellationToken cancellationToken)
        {
            Evaluation? evaluation = await _dataContext.Evaluations
                   .Where(x => x.Id == request.EvaluationId)
                   .FirstOrDefaultAsync();

            if (evaluation == null)
            {
                throw new NotFoundException(nameof(Observation), request.EvaluationId);
            }

            evaluation.EvaluateePlanType = EvaluateePlanType.FOCUSED;
            evaluation.FocusedFrameworkNodeId = request.FocusedFrameworkNodeId;
            evaluation.FocusedSGFrameworkNodeId = request.FocusedSGFrameworkNodeId;
            evaluation.ComprehensiveCarryForward = true;
            evaluation.ComprehensiveCarryForwardSchoolYear = request.CarryForwardSchoolYear;
            evaluation.ComprehensiveCarryForwardPerformanceLevel = request.CarryForwardPerformanceLevel;

            _dataContext.SaveChanges();

            return Unit.Value;
        }
    }
}
