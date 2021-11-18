using SE.Core.Models;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Queries
{
    internal class QueryUtils
    {
        public static List<EvaluationSummaryDTO> BuildEvaluationSummaryDTO(IQueryable<Evaluation> query, WorkAreaContext workAreaContext)
        {
            return query.Select(e => new EvaluationSummaryDTO
            {
                Id = e.Id,
                WfState = (WfState)e.WfState,
                WfStateDisplayName = workAreaContext == null ? "" : EnumUtils.MapWfStateToDisplayName((WfState)e.WfState, workAreaContext.WorkArea.Role.DisplayName, workAreaContext.WorkArea.EvaluateeRole.DisplayName),
                LockDateTime = e.LockDateTime,
                EvaluateeDisplayName = e.Evaluatee.FirstName + " " + e.Evaluatee.LastName,
                EvaluatorDisplayName = e.Evaluator.FirstName + " " + e.Evaluator.LastName,
                ProfileImageUrl = e.Evaluatee.ProfileImageUrl,

                EvaluateeId = e.EvaluateeId,
                EvaluatorId = e.Evaluator.Id,

                EvaluationType = e.EvaluationType,
                EvaluationTypeDisplayName = EnumUtils.EvaluationTypeDisplayName(e.EvaluationType),

                PlanType = (EvaluateePlanType)e.EvaluateePlanType,
                EvaluateePlanTypeDisplayName = EnumUtils.MapEvaluateePlanTypeToDisplayName(e.EvaluateePlanType),

                ComprehensiveCarryForward = System.Convert.ToBoolean(e.ComprehensiveCarryForward),
                ComprehensiveCarryForwardPerformanceLevel = e.ComprehensiveCarryForwardPerformanceLevel != null ?
                                        (RubricPerformanceLevel)System.Convert.ToInt16(e.ComprehensiveCarryForwardPerformanceLevel) : null,
                ComprehensiveCarryForwardSchoolYear = e.ComprehensiveCarryForwardPerformanceLevel != null ?
                                        (SchoolYear)System.Convert.ToInt16(e.ComprehensiveCarryForwardSchoolYear) : null,
                FocusedFrameworkNodeId = e.FocusedFrameworkNodeId,
                FocusedSGFrameworkNodeId = e.FocusedSGFrameworkNodeId,
                FocusedFrameworkNodeDisplayName = (e.FocusedFrameworkNode != null) ? e.FocusedFrameworkNode.ShortName : "",
                FocusedSGFrameworkNodeDisplayName = (e.FocusedSGFrameworkNode != null) ? e.FocusedSGFrameworkNode.ShortName : "",
            }).OrderBy(x => x.EvaluateeDisplayName).ToList();
        }
    }
}
