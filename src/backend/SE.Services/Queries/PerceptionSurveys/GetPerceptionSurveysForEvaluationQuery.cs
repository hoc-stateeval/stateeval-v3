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

namespace SE.Core.Queries.PerceptionSurveys
{
    public class GetPerceptionSurveysForEvaluationQueryValidator
    : AbstractValidator<GetPerceptionSurveysForEvaluationQuery>
    {
        public GetPerceptionSurveysForEvaluationQueryValidator()
        {
        }
    }
    public sealed class GetPerceptionSurveysForEvaluationQuery : 
        IRequest<IResponse<List<PerceptionSurveyDTO>>>
    {
        public long EvaluationId { get; }

        public GetPerceptionSurveysForEvaluationQuery(long evaluationId)
        {
            EvaluationId = evaluationId;
        }

        internal sealed class GetPerceptionSurveysForEvaluationQueryHandler : 
            IRequestHandler<GetPerceptionSurveysForEvaluationQuery, IResponse<List<PerceptionSurveyDTO>>>
        {
            private readonly DataContext _dataContext;
            public GetPerceptionSurveysForEvaluationQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<IResponse<List<PerceptionSurveyDTO>>> Handle(GetPerceptionSurveysForEvaluationQuery request, CancellationToken cancellationToken)
            {
                var surveys = await _dataContext.PerceptionSurveys
                    .Include(x=>x.PerceptionSurveyPerceptionSurveyStatements)
                    .Where(x => x.EvaluationId == request.EvaluationId)
                    .Select(x => x.MapToPerceptionSurveyDTO())
                    .ToListAsync();

                return Response.Success(surveys);
            }
        }
    }
}
