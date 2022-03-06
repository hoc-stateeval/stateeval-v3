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
    public class GetPerceptionSurveyByIdQueryValidator
    : AbstractValidator<GetPerceptionSurveyByIdQuery>
    {
        public GetPerceptionSurveyByIdQueryValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }
    public sealed class GetPerceptionSurveyByIdQuery : 
        IRequest<IResponse<PerceptionSurveyDTO>>
    {
        public long Id { get; }

        public GetPerceptionSurveyByIdQuery(long id)
        {
            Id = id;
        }

        internal sealed class GetPerceptionSurveyByIdQueryHandler : 
            IRequestHandler<GetPerceptionSurveyByIdQuery, IResponse<PerceptionSurveyDTO>>
        {
            private readonly DataContext _dataContext;
            public GetPerceptionSurveyByIdQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<IResponse<PerceptionSurveyDTO>> Handle(GetPerceptionSurveyByIdQuery request, CancellationToken cancellationToken)
            {
                PerceptionSurvey? survey = await _dataContext.PerceptionSurveys
                    .Where(x => x.Id == request.Id).FirstOrDefaultAsync();

                if (survey == null)
                {
                    throw new NotFoundException(nameof(PerceptionSurvey), request.Id);
                }

                return Response.Success(survey.MapToPerceptionSurveyDTO());
            }
        }
    }
}
