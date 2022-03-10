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
using SE.Core.Mappers;

namespace SE.Core.Queries.Observations
{
    public class GetObservationsForEvaluationQueryValidator
    : AbstractValidator<GetObservationsForEvaluationQuery>
    {
        public GetObservationsForEvaluationQueryValidator()
        {
        }
    }
    public sealed class GetObservationsForEvaluationQuery : 
        IRequest<IResponse<List<ObservationDTO>>>
    {
        public long EvaluationId { get; }

        public GetObservationsForEvaluationQuery(long evaluationId)
        {
            EvaluationId = evaluationId;
        }

        internal sealed class GetObservationsForEvaluationQueryHandler : 
            IRequestHandler<GetObservationsForEvaluationQuery, IResponse<List<ObservationDTO>>>
        {
            private readonly DataContext _dataContext;
            public GetObservationsForEvaluationQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<IResponse<List<ObservationDTO>>> Handle(GetObservationsForEvaluationQuery request, CancellationToken cancellationToken)
            {
                var observations = await _dataContext.Observations
                    .Where(x => x.EvaluationId == request.EvaluationId)
                    .Select(x => x.MapToObservationDTO())
                    .ToListAsync();

                return Response.Success(observations);
            }
        }
    }
}
