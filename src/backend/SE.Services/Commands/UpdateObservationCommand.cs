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
    public class UpdateObservationCommandValidator
    : AbstractValidator<UpdateObservationCommand>
    {
        public UpdateObservationCommandValidator()
        {
            RuleFor(x=>x.ObservationId).NotEmpty();
        }
    }
    public sealed class UpdateObservationCommand : 
        IRequest<Unit>
    {
        public long ObservationId { get; }
        public string Title { get; }
        public EvaluateePlanType EvaluateePlanType { get; }

        public UpdateObservationCommand(long observationId, string title, EvaluateePlanType evaluateePlanType)
        {
            ObservationId = observationId;
            Title = title;
            EvaluateePlanType = evaluateePlanType; 
        }
    }

    public class UpdateObservationCommandHandler :
    IRequestHandler<UpdateObservationCommand, Unit>
    {
        private readonly DataContext _dataContext;
        public UpdateObservationCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Unit> Handle(UpdateObservationCommand request, CancellationToken cancellationToken)
        {
            Observation? observation = await _dataContext.Observations
                   .Where(x => x.Id == request.ObservationId)
                   .FirstOrDefaultAsync();

            if (observation == null)
            {
                throw new NotFoundException(nameof(Observation), request.ObservationId);
            }

            observation.Title = request.Title;
            observation.EvaluateePlanType = request.EvaluateePlanType;

            _dataContext.SaveChanges();

            return Unit.Value;
        }
    }
}
