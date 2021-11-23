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

namespace SE.Services.Queries
{
    public class GetEvaluationsForWorkAreaContextQueryValidator
    : AbstractValidator<GetEvaluationsForWorkAreaContextQuery>
    {
        public GetEvaluationsForWorkAreaContextQueryValidator()
        {
            RuleFor(x => x.UserId).NotEmpty();
            RuleFor(x => x.WorkAreaContextId).NotEmpty();
        }
    }
    public sealed class GetEvaluationsForWorkAreaContextQuery : 
        IRequest<List<EvaluationSummaryDTO>>
    {
        public long UserId { get; }
        public long WorkAreaContextId { get; }

        public GetEvaluationsForWorkAreaContextQuery(long userId, long workAreaContextId)
        {
            UserId = userId;
            WorkAreaContextId = workAreaContextId;
        }

        internal sealed class GetEvaluationsForWorkAreaContextQueryHandler : 
            IRequestHandler<GetEvaluationsForWorkAreaContextQuery, List<EvaluationSummaryDTO>>
        {
            private readonly DataContext _dataContext;
            public GetEvaluationsForWorkAreaContextQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<List<EvaluationSummaryDTO>> Handle(GetEvaluationsForWorkAreaContextQuery request, CancellationToken cancellationToken)
            {
                WorkAreaContext? workAreaContext = await _dataContext.WorkAreaContexts
                    .Include(x=>x.Building)
                    .Include(x=>x.WorkArea).ThenInclude(x=>x.Role)
                    .Include(x=>x.WorkArea).ThenInclude(x=>x.EvaluateeRole)
                    .Include(x=>x.FrameworkContext)
                    .Where(x => x.Id == request.WorkAreaContextId).FirstOrDefaultAsync(cancellationToken: cancellationToken);

                var query = _dataContext.Evaluations
                    .Include(x => x.Evaluatee)
                    .Include(x => x.Evaluator)
                    .Include(x => x.FocusedFrameworkNode)
                    .Include(x => x.FocusedSGFrameworkNode)
                    .Where(x => x.IsActive &&
                                x.SchoolYear == EnumUtils.CurrentSchoolYear &&
                                x.DistrictCode == workAreaContext.Building.DistrictCode &&
                                x.SchoolCode == workAreaContext.Building.SchoolCode &&
                                x.EvaluationType == workAreaContext.FrameworkContext.EvaluationType &&
                                (
                                 // Evaluatee - can only see their own evaluation
                                 workAreaContext.WorkArea.IsEvaluatee && x.EvaluateeId == workAreaContext.UserId ||
                                 // Evaluator
                                 (workAreaContext.WorkArea.IsEvaluator &&
                                 // Non-DTE - can see all evaluations at his building
                                 ((workAreaContext.WorkArea.TagName != EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DTE) ||
                                  // DTE - can only see evaluations assigned to him
                                  x.EvaluatorId == workAreaContext.UserId)))));



                List<EvaluationSummaryDTO> evaluations = QueryUtils.BuildEvaluationSummaryDTO(query);
                return evaluations;
            }
        }
    }
}
