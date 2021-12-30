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
    public class GetEvaluationsForWorkAreaContextQueryValidator
    : AbstractValidator<GetEvaluationsForWorkAreaContextQuery>
    {
        public GetEvaluationsForWorkAreaContextQueryValidator()
        {
            RuleFor(x => x.WorkAreaContextId).NotEmpty();
        }
    }
    public sealed class GetEvaluationsForWorkAreaContextQuery : 
        IRequest<List<EvaluationSummaryDTO>>
    {
        public long WorkAreaContextId { get; }

        public GetEvaluationsForWorkAreaContextQuery(long workAreaContextId)
        {
            WorkAreaContextId = workAreaContextId;
        }

        internal sealed class GetEvaluationsForWorkAreaContextQueryHandler : 
            IRequestHandler<GetEvaluationsForWorkAreaContextQuery, List<EvaluationSummaryDTO>>
        {
            private readonly DataContext _dataContext;
            private readonly IEvaluationService _evaluationService;

            public GetEvaluationsForWorkAreaContextQueryHandler(DataContext dataContext, IEvaluationService evaluationService)
            {
                _dataContext = dataContext;
                _evaluationService = evaluationService;
            }

            public async Task<List<EvaluationSummaryDTO>> Handle(GetEvaluationsForWorkAreaContextQuery request, CancellationToken cancellationToken)
            {
                WorkAreaContext? workAreaContext = await _dataContext.WorkAreaContexts
                    .Include(x=>x.Building)
                    .Include(x=>x.WorkArea).ThenInclude(x=>x.Role)
                    .Include(x=>x.WorkArea).ThenInclude(x=>x.EvaluateeRole)
                    .Include(x=>x.FrameworkContext)
                    .Where(x => x.Id == request.WorkAreaContextId).FirstOrDefaultAsync(cancellationToken: cancellationToken);

                var evaluations = await _evaluationService
                    .ExecuteEvaluationSummaryDTOQuery(x => x.IsActive &&
                                x.FrameworkContextId == workAreaContext.FrameworkContextId &&
                                x.SchoolCode == workAreaContext.Building.SchoolCode &&
                                (
                                 // Evaluatee - can only see their own evaluation
                                 workAreaContext.WorkArea.IsEvaluatee && x.EvaluateeId == workAreaContext.UserId ||
                                 // Evaluator
                                 (workAreaContext.WorkArea.IsEvaluator &&
                                 // Non-DTE - can see all evaluations at his building
                                 ((workAreaContext.WorkArea.TagName != EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DTE) ||
                                  // DTE - can only see evaluations assigned to him
                                  x.EvaluatorId == workAreaContext.UserId)))))
                    .ToListAsync();

                return evaluations;
            }
        }
    }
}
