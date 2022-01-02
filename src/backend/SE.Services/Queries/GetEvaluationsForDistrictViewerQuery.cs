using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;
using MediatR;
using SE.Data;
using SE.Domain.Entities;
using SE.Core.Models;
using Microsoft.EntityFrameworkCore;
using SE.Core.Services;
using SE.Core.Utils;

namespace SE.Core.Queries
{
    public class GetEvaluationsForDistrictViewerQueryValidator
    : AbstractValidator<GetEvaluationsForDistrictViewerQuery>
    {
        public GetEvaluationsForDistrictViewerQueryValidator()
        {
        }
    }
    public sealed class GetEvaluationsForDistrictViewerQuery : 
        IRequest<List<EvaluationSummaryDTO>>
    {
        public long FrameworkContextId { get; }
        public long EvaluatorId { get; }
        public string SchoolCode { get; }  

        public GetEvaluationsForDistrictViewerQuery(long frameworkContextId, long evaluatorId, string schoolCode)
        {
            SchoolCode = schoolCode;
            EvaluatorId = evaluatorId;
            FrameworkContextId = frameworkContextId;
        }

        internal sealed class GetEvaluationsForDistrictViewerQueryHandler : 
            IRequestHandler<GetEvaluationsForDistrictViewerQuery, List<EvaluationSummaryDTO>>
        {
            private readonly DataContext _dataContext;
            private readonly IEvaluationService _evaluationService;
           
            public GetEvaluationsForDistrictViewerQueryHandler(DataContext dataContext, IEvaluationService evaluationService)
            {
                _dataContext = dataContext;
                _evaluationService = evaluationService;
            }

            public async Task<List<EvaluationSummaryDTO>> Handle(GetEvaluationsForDistrictViewerQuery request, CancellationToken cancellationToken)
            {
                var workAreaContext = await _dataContext.WorkAreaContexts
                    .Include(x => x.Building)
                    .Include(x => x.WorkArea)
                    .Where(x => x.FrameworkContextId == request.FrameworkContextId &&
                                x.UserId == request.EvaluatorId &&
                                x.Building.SchoolCode == request.SchoolCode)
                    .FirstOrDefaultAsync();

                var evaluations = await _evaluationService.GetEvaluationsForWorkAreaContext(workAreaContext);

                return evaluations;
            }
        }
    }
}
