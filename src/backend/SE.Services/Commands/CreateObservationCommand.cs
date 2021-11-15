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
    public class CreateObservationCommandValidator
    : AbstractValidator<CreateObservationCommand>
    {
        public CreateObservationCommandValidator()
        {
            RuleFor(x=>x.EvaluationId).NotEmpty();
            RuleFor(x=>x.ShortName).NotEmpty();
            RuleFor(x => x.Type).NotEmpty();
            RuleFor(x=>x.EvaluatorId).NotEmpty();
        }
    }
    public sealed class CreateObservationCommand : 
        IRequest<ObservationDTO>
    {
        public long EvaluationId { get; }
        public string ShortName { get; }
        public EvaluateePlanType Type { get; }
        public long EvaluatorId { get; }

        public CreateObservationCommand(long evaluationId, string shortName, EvaluateePlanType type, long evaluatorId)
        {
            EvaluationId = evaluationId;
            ShortName = shortName;
            Type = type;
            EvaluatorId = evaluatorId;  
        }
    }

    public class CreateObservationCommandHandler :
    IRequestHandler<CreateObservationCommand, ObservationDTO>
    {
        private readonly DataContext _dataContext;
        public CreateObservationCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<ObservationDTO> Handle(CreateObservationCommand request, CancellationToken cancellationToken)
        {
            Evaluation? evaluation = await _dataContext.Evaluations
                 .Where(x => x.Id == request.EvaluationId).FirstOrDefaultAsync();

            if (evaluation == null)
            {
                throw new NotFoundException(nameof(Observation), request.EvaluationId);
            }

            User? evaluator = await _dataContext.Users
                .Where(x => x.Id == request.EvaluatorId).FirstOrDefaultAsync();

            if (evaluator == null)
            {
                throw new NotFiniteNumberException(nameof(User), request.EvaluatorId);
            }

            return new ObservationDTO();
        }
    }
}
