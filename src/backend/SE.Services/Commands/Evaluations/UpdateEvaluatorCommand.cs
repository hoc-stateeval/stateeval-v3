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

namespace SE.Core.Commands.Evaluations
{
    public class UpdateEvaluatorCommandValidator
    : AbstractValidator<UpdateEvaluatorCommand>
    {
        public UpdateEvaluatorCommandValidator()
        {
        }
    }
    public sealed class UpdateEvaluatorCommand :
        IRequest<Unit>
    {
        public long EvaluationId { get; }
        public long? EvaluatorId { get; }

        public UpdateEvaluatorCommand(
            long evaluationId, 
            long? evaluatorId)
        {
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
