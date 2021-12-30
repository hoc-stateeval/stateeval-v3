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
            RuleFor(x => x.SchoolCode).NotEmpty();
        }
    }
    public sealed class GetEvaluationsForSchoolQuery :
        IRequest<List<EvaluationSummaryDTO>>
    {
        public long FrameworkContextId { get; }
        public string SchoolCode { get; }

        public GetEvaluationsForSchoolQuery(long frameworkContextId, string schoolCode)
        {
            FrameworkContextId = frameworkContextId;
            SchoolCode = schoolCode;
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
                                x.FrameworkContextId == request.FrameworkContextId &&
                                x.SchoolCode == request.SchoolCode)
                .ToListAsync();

                return evaluations;
            }
        }
    }
}
