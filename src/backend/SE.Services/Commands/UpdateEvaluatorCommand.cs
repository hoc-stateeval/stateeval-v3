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
    public class UpdateEvaluatorCommandValidator
    : AbstractValidator<UpdateEvaluatorCommand>
    {
        public UpdateEvaluatorCommandValidator()
        {
            RuleFor(x=>x.UserId).NotEmpty();
            RuleFor(x => x.WorkAreaContextId).NotEmpty();
            RuleFor(x => x.EvaluationId).NotEmpty();
        }
    }
    public sealed class UpdateEvaluatorCommand :
        IRequest<Unit>
    {
        public long UserId { get; }
        public long WorkAreaContextId { get; }
        public long EvaluationId { get; }
        public long? EvaluatorId { get; }

        public UpdateEvaluatorCommand(
            long userId,
            long workAreaContextId,
            long evaluationId, 
            long? evaluatorId)
        {
            UserId = userId;
            WorkAreaContextId = workAreaContextId;
            EvaluationId = evaluationId;
            EvaluatorId = evaluatorId;
        }
    }

    public class UpdateEvaluatorCommandHandler :
    IRequestHandler<UpdateEvaluatorCommand, Unit>
    {
        private readonly DataContext _dataContext;
        public UpdateEvaluatorCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Unit> Handle(UpdateEvaluatorCommand request, CancellationToken cancellationToken)
        {
            Evaluation? evaluation = await _dataContext.Evaluations
                   .Where(x => x.Id == request.EvaluationId)
                   .FirstOrDefaultAsync();

            if (evaluation == null)
            {
                throw new NotFoundException(nameof(Evaluation), request.EvaluationId);
            }

            evaluation.EvaluatorId = request.EvaluatorId;

            _dataContext.SaveChanges();

            return Unit.Value;
        }
    }
}
