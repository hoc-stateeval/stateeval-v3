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
    public class GetEvaluationsForEvaluatorQueryValidator
    : AbstractValidator<GetEvaluationsForEvaluatorQuery>
    {
        public GetEvaluationsForEvaluatorQueryValidator()
        {
            RuleFor(x => x.EvaluatorId).NotEmpty();
            RuleFor(x => x.DistrictCode).NotEmpty();
            RuleFor(x => x.SchoolCode).NotEmpty();
            RuleFor(x => x.EvaluationType).NotEmpty();
        }
    }
    public sealed class GetEvaluationsForEvaluatorQuery :
        IRequest<List<EvaluationSummaryDTO>>
    {
        public long EvaluatorId { get; }
        public string DistrictCode { get; }
        public string SchoolCode { get; }
        public EvaluationType EvaluationType { get; }

        public GetEvaluationsForEvaluatorQuery(long evaluatorId, string districtCode, string schoolCode, EvaluationType evaluationType)
        {
            EvaluatorId = evaluatorId;
            DistrictCode = districtCode;
            SchoolCode = schoolCode;
            EvaluationType = evaluationType;
        }

        internal sealed class GetEvaluationsForEvaluatorQueryHandler : 
            IRequestHandler<GetEvaluationsForEvaluatorQuery, List<EvaluationSummaryDTO>>
        {
            private readonly DataContext _dataContext;
            private readonly IEvaluationService _evaluationService;
            public GetEvaluationsForEvaluatorQueryHandler(DataContext dataContext, IEvaluationService evaluationService)
            {
                _dataContext = dataContext;
                _evaluationService = evaluationService;
            }

            public async Task<List<EvaluationSummaryDTO>> Handle(GetEvaluationsForEvaluatorQuery request, CancellationToken cancellationToken)
            {
                var evaluations = await _evaluationService
                    .ExecuteEvaluationSummaryDTOQuery(x => x.IsActive &&
                              x.SchoolYear == EnumUtils.CurrentSchoolYear &&
                              x.DistrictCode == request.DistrictCode &&
                              (String.IsNullOrEmpty(x.SchoolCode) || x.SchoolCode == request.SchoolCode) &&
                              x.EvaluatorId == request.EvaluatorId &&
                              x.EvaluationType == request.EvaluationType)
                    .ToListAsync();

                return evaluations;
            }
        }
    }
}
