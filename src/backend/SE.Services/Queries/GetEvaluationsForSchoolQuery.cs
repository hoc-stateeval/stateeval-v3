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
            public GetEvaluationsForSchoolQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<List<EvaluationSummaryDTO>> Handle(GetEvaluationsForSchoolQuery request, CancellationToken cancellationToken)
            {
                var evaluations = await _dataContext.Evaluations
                    .Include(x => x.Evaluatee)
                    .Include(x => x.Evaluator)
                    .Include(x => x.FocusedFrameworkNode)
                    .Include(x => x.FocusedSGFrameworkNode)
                    .Where(x => x.IsActive &&
                                x.SchoolYear == EnumUtils.CurrentSchoolYear &&
                                x.DistrictCode == request.DistrictCode &&
                                x.SchoolCode == request.SchoolCode &&
                                x.EvaluationType == request.EvaluationType)
                    .Select(e => Mapper.MapToEvaluationSummaryDTO(e))
                    .OrderBy(x => x.EvaluateeDisplayName)
                    .ToListAsync();

                return evaluations;
            }
        }
    }
}
