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

namespace SE.Core.Commands.Observations
{
    public class DeleteObservationCommandValidator
    : AbstractValidator<DeleteObservationCommand>
    {
        public DeleteObservationCommandValidator()
        {
        }
    }
    public sealed class DeleteObservationCommand : 
        IRequest<Unit>
    {
        public long ObservationId { get; }
        public DeleteObservationCommand(long observationId)
        {
            ObservationId = observationId; 
        }
    }

    public class DeleteObservationCommandHandler :
    IRequestHandler<DeleteObservationCommand, Unit>
    {
        private readonly DataContext _dataContext;
        public DeleteObservationCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Unit> Handle(DeleteObservationCommand request, CancellationToken cancellationToken)
        {
            Observation? observation = await _dataContext.Observations
                 .Where(x => x.Id == request.ObservationId)
                 .FirstOrDefaultAsync();

            if (observation == null)
            {
                throw new NotFoundException(nameof(Observation), request.ObservationId);
            }

            _dataContext.Observations.Remove(observation);
            _dataContext.SaveChanges();

            return Unit.Value;
        }
    }
}
