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
    public class GetPerceptionSurveyStatementsForFrameworkTagNameQueryValidator
    : AbstractValidator<GetPerceptionSurveyStatementsForFrameworkTagNameQuery>
    {
        public GetPerceptionSurveyStatementsForFrameworkTagNameQueryValidator()
        {
            RuleFor(x => x.TagName).NotEmpty();
        }
    }
    public sealed class GetPerceptionSurveyStatementsForFrameworkTagNameQuery : 
        IRequest<IResponse<List<PerceptionSurveyStatementDTO>>>
    {
        public string TagName { get; set;  }

        public GetPerceptionSurveyStatementsForFrameworkTagNameQuery(string tagName)
        {
            TagName = tagName;
        }

        internal sealed class GetPerceptionSurveyStatementsForFrameworkTagNameQueryHandler : 
            IRequestHandler<GetPerceptionSurveyStatementsForFrameworkTagNameQuery, IResponse<List<PerceptionSurveyStatementDTO>>>
        {
            private readonly DataContext _dataContext;
            public GetPerceptionSurveyStatementsForFrameworkTagNameQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<IResponse<List<PerceptionSurveyStatementDTO>>> Handle(GetPerceptionSurveyStatementsForFrameworkTagNameQuery request, CancellationToken cancellationToken)
            {
                List<PerceptionSurveyStatementDTO> statements = await _dataContext.PerceptionSurveyStatements
                    .Where(x => x.FrameworkTagName == request.TagName)
                    .Select(x => x.MapToPerceptionSurveyStatementDTO())
                    .ToListAsync();

                return Response.Success(statements);
            }
        }
    }
}
