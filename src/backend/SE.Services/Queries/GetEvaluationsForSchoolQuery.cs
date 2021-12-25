using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SE.Data;
using SE.Domain.Entities;
using SE.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SE.Core.Queries;
using SE.Core.Mappers;
using SE.Core.Services;

namespace SE.Services.Queries
{
    public class GetEvaluationsForSchoolQueryValidator
    : AbstractValidator<GetEvaluationsForSchoolQuery>
    {
        public GetEvaluationsForSchoolQueryValidator()
        {
            RuleFor(x => x.DistrictCode).NotEmpty();
            RuleFor(x => x.SchoolCode).NotEmpty();
            RuleFor(x => x.EvaluationType).NotEmpty();
        }
    }
    public sealed class GetEvaluationsForSchoolQuery :
        IRequest<List<EvaluationSummaryDTO>>
    {
        public string DistrictCode { get; }
        public string SchoolCode { get; }
        public EvaluationType EvaluationType { get; }

        public GetEvaluationsForSchoolQuery(string districtCode, string schoolCode, EvaluationType evaluationType)
        {
            DistrictCode = districtCode;
            SchoolCode = schoolCode;
            EvaluationType = evaluationType;
        }

        internal sealed class GetEvaluationsForSchoolQueryHandler : 
            IRequestHandler<GetEvaluationsForSchoolQuery, List<EvaluationSummaryDTO>>
        {
            private readonly DataContext _dataContext;
            private readonly IEvaluationService _evaluationService;
            public GetEvaluationsForSchoolQueryHandler(DataContext dataContext, IEvaluationService evaluationService)
            {
                _dataContext = dataContext;
                _evaluationService = evaluationService;
            }

            public async Task<List<EvaluationSummaryDTO>> Handle(GetEvaluationsForSchoolQuery request, CancellationToken cancellationToken)
            {
                var evaluations = await _evaluationService
                .ExecuteEvaluationSummaryDTOQuery(x => x.IsActive &&
                                x.SchoolYear == EnumUtils.CurrentSchoolYear &&
                                x.DistrictCode == request.DistrictCode &&
                                x.SchoolCode == request.SchoolCode &&
                                x.EvaluationType == request.EvaluationType)
                .ToListAsync();

                return evaluations;
            }
        }
    }
}
