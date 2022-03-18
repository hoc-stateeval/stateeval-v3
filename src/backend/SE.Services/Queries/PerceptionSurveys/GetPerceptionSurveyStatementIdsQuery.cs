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
using SE.Core.Common.Exceptions;

namespace SE.Core.Queries.PerceptionSurveys
{
    public class GetPerceptionSurveyStatementsIdsQueryValidator
    : AbstractValidator<GetPerceptionSurveyStatementsIdsQuery>
    {
        public GetPerceptionSurveyStatementsIdsQueryValidator()
        {
        }
    }
    public sealed class GetPerceptionSurveyStatementsIdsQuery : 
        IRequest<List<long>>
    {
        public long SurveyId { get; set;  }

        public GetPerceptionSurveyStatementsIdsQuery(long surveyId)
        {
            SurveyId = surveyId;
        }

        internal sealed class GetPerceptionSurveyStatementsIdsQueryHandler : 
            IRequestHandler<GetPerceptionSurveyStatementsIdsQuery, List<long>>
        {
            private readonly DataContext _dataContext;
            public GetPerceptionSurveyStatementsIdsQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<List<long>> Handle(GetPerceptionSurveyStatementsIdsQuery request, CancellationToken cancellationToken)
            {
                var survey = await _dataContext.PerceptionSurveys
                   .Include(x => x.PerceptionSurveyPerceptionSurveyStatements)
                   .Where(x => x.Id == request.SurveyId)
                   .FirstAsync();

                var statementIds = survey.PerceptionSurveyPerceptionSurveyStatements.Select(x => x.PerceptionSurveyStatementId).ToList();

                return statementIds;
            }
        }
    }
}
