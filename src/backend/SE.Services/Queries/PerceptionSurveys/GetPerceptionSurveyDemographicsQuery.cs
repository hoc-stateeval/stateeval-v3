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
    public class GetPerceptionSurveyDemographicsQueryValidator
    : AbstractValidator<GetPerceptionSurveyDemographicsQuery>
    {
        public GetPerceptionSurveyDemographicsQueryValidator()
        {
        }
    }
    public sealed class GetPerceptionSurveyDemographicsQuery : 
        IRequest<List<PerceptionSurveyDemographicDTO>>
    {
        public long SurveyId { get; set;  }

        public GetPerceptionSurveyDemographicsQuery(long surveyId)
        {
            SurveyId = surveyId;
        }

        internal sealed class GetPerceptionSurveyDemographicsQueryHandler : 
            IRequestHandler<GetPerceptionSurveyDemographicsQuery, List<PerceptionSurveyDemographicDTO>>
        {
            private readonly DataContext _dataContext;
            public GetPerceptionSurveyDemographicsQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<List<PerceptionSurveyDemographicDTO>> Handle(GetPerceptionSurveyDemographicsQuery request, CancellationToken cancellationToken)
            {
                List<PerceptionSurveyDemographicDTO> responses = await _dataContext.PerceptionSurveyDemographics
                    .Where(x => x.PerceptionSurveyId == request.SurveyId)
                    .Select(x => x.MapToPerceptionSurveyDemographicDTO())
                    .ToListAsync();

                return responses;
            }
        }
    }
}
