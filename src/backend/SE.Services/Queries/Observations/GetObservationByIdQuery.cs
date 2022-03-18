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
using SE.Core.Common;
using SE.Core.Services;
using SE.Core.Common.Exceptions;
using SE.Core.Mappers;

namespace SE.Core.Queries.Observations
{
    public class GetObservationByIdQueryValidator
    : AbstractValidator<GetObservationByIdQuery>
    {
        public GetObservationByIdQueryValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }
    public sealed class GetObservationByIdQuery : 
        IRequest<ObservationDTO>
    {
        public long Id { get; }

        public GetObservationByIdQuery(long id)
        {
            Id = id;
        }

        internal sealed class GetObservationByIdQueryHandler : 
            IRequestHandler<GetObservationByIdQuery, ObservationDTO>
        {
            private readonly DataContext _dataContext;
            public GetObservationByIdQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<ObservationDTO> Handle(GetObservationByIdQuery request, CancellationToken cancellationToken)
            {
                Observation? observation = await _dataContext.Observations
                    .Include(x => x.Evaluator)
                    .Include(x => x.Evaluation).ThenInclude(x => x.Evaluatee)
                    .Where(x => x.Id == request.Id)
                    .FirstOrDefaultAsync();

                if (observation == null)
                {
                    throw new NotFoundException(nameof(Observation), request.Id);
                }

                return observation.MapToObservationDTO();
            }
        }
    }
}
