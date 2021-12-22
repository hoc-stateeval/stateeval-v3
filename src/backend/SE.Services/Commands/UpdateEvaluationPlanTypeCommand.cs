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
    public class UpdateEvaluateePlanTypeCommandValidator
    : AbstractValidator<UpdateEvaluateePlanTypeCommand>
    {
        public UpdateEvaluateePlanTypeCommandValidator()
        {
            RuleFor(x => x.EvaluationId).NotEmpty();

            RuleFor(x => x.FocusedFrameworkNodeId).NotNull()
                .When(x => x.EvaluateePlanType == EvaluateePlanType.FOCUSED)
                .WithMessage("Focus Framework Node Id is missing.");

            RuleFor(x => x.CarryForwardPerformanceLevel).NotNull()
                .When(x => x.EvaluateePlanType == EvaluateePlanType.FOCUSED)
                .WithMessage("Carry Forward Performance Level is missing.");

            RuleFor(x => x.CarryForwardSchoolYear).NotNull()
                .When(x => x.EvaluateePlanType == EvaluateePlanType.FOCUSED)
                .WithMessage("Carry Forward School Year is missing.");
        }
    }
    public sealed class UpdateEvaluateePlanTypeCommand :
        IRequest<Unit>
    {
        public long EvaluationId { get; }
        public EvaluateePlanType EvaluateePlanType { get; }
        public long? FocusedFrameworkNodeId { get; }
        public long? FocusedSGFrameworkNodeId { get; }
        public SchoolYear? CarryForwardSchoolYear { get; }
        public RubricPerformanceLevel? CarryForwardPerformanceLevel { get;  }

        public UpdateEvaluateePlanTypeCommand(
            long evaluationId, 
            EvaluateePlanType evaluateePlanType,
            long? focusedFrameworkNodeId = null,
            long? focusedSGFrameworkNodeId = null,
            SchoolYear? carryForwardSchoolYear = null,
            RubricPerformanceLevel? carryForwardPerformanceLevel =  null)
        {
            EvaluationId = evaluationId;
            EvaluateePlanType = evaluateePlanType;
            FocusedFrameworkNodeId = focusedFrameworkNodeId;
            FocusedSGFrameworkNodeId = focusedSGFrameworkNodeId;
            CarryForwardPerformanceLevel = carryForwardPerformanceLevel;
            CarryForwardSchoolYear = carryForwardSchoolYear;
        }
    }

    public class UpdateEvaluateePlanTypeCommandHandler :
    IRequestHandler<UpdateEvaluateePlanTypeCommand, Unit>
    {
        private readonly DataContext _dataContext;
        public UpdateEvaluateePlanTypeCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Unit> Handle(UpdateEvaluateePlanTypeCommand request, CancellationToken cancellationToken)
        {
            Evaluation? evaluation = await _dataContext.Evaluations
                   .Where(x => x.Id == request.EvaluationId)
                   .FirstOrDefaultAsync();

            if (evaluation == null)
            {
                throw new NotFoundException(nameof(Evaluation), request.EvaluationId);
            }

            evaluation.EvaluateePlanType = request.EvaluateePlanType;
            evaluation.ComprehensiveCarryForward = false;
            evaluation.CarryForwardPerformanceLevel = null;
            evaluation.CarryForwardSchoolYear = null;
            evaluation.FocusedFrameworkNodeId = null;
            evaluation.FocusedSGFrameworkNodeId = null;

            if (request.EvaluateePlanType == EvaluateePlanType.FOCUSED)
            {
                evaluation.ComprehensiveCarryForward = true;
                evaluation.CarryForwardPerformanceLevel = request.CarryForwardPerformanceLevel;
                evaluation.CarryForwardSchoolYear = request.CarryForwardSchoolYear;
                evaluation.FocusedFrameworkNodeId = request.FocusedFrameworkNodeId;
                evaluation.FocusedSGFrameworkNodeId = request.FocusedSGFrameworkNodeId;
            }

            _dataContext.SaveChanges();

            return Unit.Value;
        }
    }
}
