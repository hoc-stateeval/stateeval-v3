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

namespace SE.Core.Queries
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
        IRequest<IResponse<ObservationDTO>>
    {
        public long Id { get; }

        public GetObservationByIdQuery(long id)
        {
            Id = id;
        }

        internal sealed class GetObservationByIdQueryHandler : 
            IRequestHandler<GetObservationByIdQuery, IResponse<ObservationDTO>>
        {
            private readonly DataContext _dataContext;
            public GetObservationByIdQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<IResponse<ObservationDTO>> Handle(GetObservationByIdQuery request, CancellationToken cancellationToken)
            {
                Observation? observation = await _dataContext.Observations
                    .Include(x => x.Evaluation)
                    .Where(x => x.Id == request.Id)
                    .FirstOrDefaultAsync();

                if (observation == null)
                {
                    
                }

                ObservationDTO observationDTO = new ObservationDTO()
                {
                    Id = observation.Id,
                    ShortName = observation.ShortName,
                    Title = observation.Title,
                    CreationDateTime = observation.CreationDateTime
                };

                return Response.Success(observationDTO);
            }
        }
    }
}
