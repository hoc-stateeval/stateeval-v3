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
    public class GetPerceptionSurveyByGuidQueryValidator
    : AbstractValidator<GetPerceptionSurveyByGuidQuery>
    {
        public GetPerceptionSurveyByGuidQueryValidator()
        {
        }
    }
    public sealed class GetPerceptionSurveyByGuidQuery : 
        IRequest<IResponse<PerceptionSurveyDTO>>
    {
        public Guid Guid { get; }

        public GetPerceptionSurveyByGuidQuery(Guid guid)
        {
            Guid = guid;
        }

        internal sealed class GetPerceptionSurveyByGuidQueryHandler : 
            IRequestHandler<GetPerceptionSurveyByGuidQuery, IResponse<PerceptionSurveyDTO>>
        {
            private readonly DataContext _dataContext;
            public GetPerceptionSurveyByGuidQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<IResponse<PerceptionSurveyDTO>> Handle(GetPerceptionSurveyByGuidQuery request, CancellationToken cancellationToken)
            {
                PerceptionSurvey? survey = await _dataContext.PerceptionSurveys
                    .Where(x => x.Guid == request.Guid)
                    .FirstOrDefaultAsync();

                if (survey == null)
                {
                    throw new NotFoundException(nameof(PerceptionSurvey), request.Guid);
                }

                return Response.Success(survey.MapToPerceptionSurveyDTO());
            }
        }
    }
}
