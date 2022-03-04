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
    public class GetPerceptionSurveyCheckedStatementsIdsQueryValidator
    : AbstractValidator<GetPerceptionSurveyCheckedStatementsIdsQuery>
    {
        public GetPerceptionSurveyCheckedStatementsIdsQueryValidator()
        {
        }
    }
    public sealed class GetPerceptionSurveyCheckedStatementsIdsQuery : 
        IRequest<IResponse<List<long>>>
    {
        public long SurveyId { get; set;  }

        public GetPerceptionSurveyCheckedStatementsIdsQuery(long surveyId)
        {
            SurveyId = surveyId;
        }

        internal sealed class GetPerceptionSurveyCheckedStatementsIdsQueryHandler : 
            IRequestHandler<GetPerceptionSurveyCheckedStatementsIdsQuery, IResponse<List<long>>>
        {
            private readonly DataContext _dataContext;
            public GetPerceptionSurveyCheckedStatementsIdsQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<IResponse<List<long>>> Handle(GetPerceptionSurveyCheckedStatementsIdsQuery request, CancellationToken cancellationToken)
            {
                var survey = await _dataContext.PerceptionSurveys
                   .Include(x => x.PerceptionSurveyPerceptionSurveyStatements)
                   .ThenInclude(x => x.PerceptionSurveyStatement)
                   .Where(x => x.Id == request.SurveyId)
                   .FirstAsync();

                var statementIds = survey.PerceptionSurveyPerceptionSurveyStatements.Select(x => x.PerceptionSurveyStatementId).ToList();

                return Response.Success(statementIds);
            }
        }
    }
}
