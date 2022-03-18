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
    public class GetPerceptionSurveyStatementsQueryValidator
    : AbstractValidator<GetPerceptionSurveyStatementsQuery>
    {
        public GetPerceptionSurveyStatementsQueryValidator()
        {
        }
    }
    public sealed class GetPerceptionSurveyStatementsQuery : 
        IRequest<List<PerceptionSurveyStatementDTO>>
    {
        public long SurveyId { get; set;  }

        public GetPerceptionSurveyStatementsQuery(long surveyId)
        {
            SurveyId = surveyId;
        }

        internal sealed class GetPerceptionSurveyStatementsQueryHandler : 
            IRequestHandler<GetPerceptionSurveyStatementsQuery, 
            List<PerceptionSurveyStatementDTO>>
        {
            private readonly DataContext _dataContext;
            public GetPerceptionSurveyStatementsQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<List<PerceptionSurveyStatementDTO>> Handle(GetPerceptionSurveyStatementsQuery request, CancellationToken cancellationToken)
            {
                List<PerceptionSurveyStatementDTO> statements = await _dataContext.PerceptionSurveyPerceptionSurveyStatements
                    .Include(x=>x.PerceptionSurveyStatement)
                    .Where(x => x.PerceptionSurveyId == request.SurveyId)
                    .Select(x => x.PerceptionSurveyStatement.MapToPerceptionSurveyStatementDTO())
                    .ToListAsync();

                return statements;
            }
        }
    }
}
