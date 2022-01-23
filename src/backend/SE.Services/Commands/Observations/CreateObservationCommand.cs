﻿using System;
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
    public sealed class CreateObservationCommand : IRequest<IResponse<ObservationDTO>>
    {
        public long EvaluationId { get; }
        public long EvaluatorId { get; }

        public CreateObservationCommand(long evaluationId, long evaluatorId)
        {
            EvaluationId = evaluationId;
            EvaluatorId = evaluatorId;  
        }
    }

    public class CreateObservationCommandHandler :
    IRequestHandler<CreateObservationCommand, IResponse<ObservationDTO>>
    {
        private readonly DataContext _dataContext;
        public CreateObservationCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IResponse<ObservationDTO>> Handle(CreateObservationCommand request, CancellationToken cancellationToken)
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

            Observation observation = new Observation(evaluation, evaluator, shortName);
            _dataContext.Observations.Add(observation);
            _dataContext.SaveChanges();

            return Response.Success(observation.MapToObservationDTO());
        }
    }
}