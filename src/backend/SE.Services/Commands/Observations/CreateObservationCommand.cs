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
using SE.Core.Services;
using SE.Core.Mappers;

namespace SE.Core.Commands.Observations
{
    public class CreateObservationCommandValidator
    : AbstractValidator<CreateObservationCommand>
    {
        public CreateObservationCommandValidator()
        {
        }
    }
    public sealed class CreateObservationCommand : IRequest<ObservationDTO>
    {
        public long EvaluationId { get; set; }
        public long EvaluatorId { get; set; }

        public ObservationType ObservationType { get; set; }

        public CreateObservationCommand(long evaluationId, long evaluatorId, ObservationType observationType)
        {
            EvaluationId = evaluationId;
            EvaluatorId = evaluatorId;
            ObservationType = observationType;
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
                  .Where(x => x.Id == request.EvaluationId)
                  .FirstOrDefaultAsync();

            if (evaluation == null)
            {
                throw new NotFoundException(nameof(Evaluation), request.EvaluationId);
            }

            User? evaluator = await _dataContext.Users
                .Where(x => x.Id == request.EvaluatorId)
                .FirstOrDefaultAsync();

            if (evaluator == null)
            {
                throw new NotFiniteNumberException(nameof(User), request.EvaluatorId);
            }

            int count = _dataContext.Observations
                .Where(x => x.EvaluationId == evaluation.Id)
                .ToList()
                .Count();

            string shortName = $"Obs {EnumUtils.GetCurrentSchoolYearDisplayName()} .{Convert.ToString(count + 1)}";

            Observation observation = new Observation(evaluation, evaluator, shortName, request.ObservationType);
            _dataContext.Observations.Add(observation);
            _dataContext.SaveChanges();

            observation = await _dataContext.Observations
                .Include(x => x.Evaluator)
                .Include(x => x.Evaluation).ThenInclude(x=>x.Evaluatee)
                .Where(x => x.Id == observation.Id)
                .FirstAsync();

            return observation.MapToObservationDTO();
        }
    }
}
