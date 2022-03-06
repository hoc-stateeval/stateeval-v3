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
    public class GetPerceptionSurveyResponsesQueryValidator
    : AbstractValidator<GetPerceptionSurveyResponsesQuery>
    {
        public GetPerceptionSurveyResponsesQueryValidator()
        {
        }
    }
    public sealed class GetPerceptionSurveyResponsesQuery : 
        IRequest<IResponse<List<PerceptionSurveyResponseDTO>>>
    {
        public long SurveyId { get; set;  }

        public GetPerceptionSurveyResponsesQuery(long surveyId)
        {
            SurveyId = surveyId;
        }

        internal sealed class GetPerceptionSurveyResponsesQueryHandler : 
            IRequestHandler<GetPerceptionSurveyResponsesQuery, IResponse<List<PerceptionSurveyResponseDTO>>>
        {
            private readonly DataContext _dataContext;
            public GetPerceptionSurveyResponsesQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<IResponse<List<PerceptionSurveyResponseDTO>>> Handle(GetPerceptionSurveyResponsesQuery request, CancellationToken cancellationToken)
            {
                List<PerceptionSurveyResponseDTO> responses = await _dataContext.PerceptionSurveyResponses
                    .Where(x => x.SurveyId == request.SurveyId)
                    .Select(x => x.MapToPerceptionSurveyResponseDTO())
                    .ToListAsync();

                return Response.Success(responses);
            }
        }
    }
}
