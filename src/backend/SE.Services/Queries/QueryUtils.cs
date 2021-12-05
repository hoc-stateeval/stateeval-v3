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
        public static List<EvaluationSummaryDTO> BuildEvaluationSummaryDTO(IQueryable<Evaluation> query)
        {
            return query.Select(e => new EvaluationSummaryDTO
            {
                Id = e.Id,
                WfState = (WfState)e.WfState,
                WfStateDisplayName = EnumUtils.MapWfStateToDisplayName((WfState)e.WfState, 
                                                    EnumUtils.MapEvaluationTypeToEvaluateeTerm(e.EvaluationType)),
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
                ModifiedCompFocusedFrameworkNode2Id = e.ModifiedCompFocusedFrameworkNode2Id,
                FocusedFrameworkNodeDisplayName = (e.FocusedFrameworkNode != null) ? e.FocusedFrameworkNode.ShortName : "",
                FocusedSGFrameworkNodeDisplayName = (e.FocusedSGFrameworkNode != null) ? e.FocusedSGFrameworkNode.ShortName : "",
                ModifiedCompFocusedFrameworkNode2DisplayName = (e.ModifiedCompFocusedFrameworkNode2 != null) ? e.ModifiedCompFocusedFrameworkNode2.ShortName : "",

                LastYearEvaluateePlanType = e.LastYearEvaluateePlanType,
                NextYearEvaluateePlanType = e.NextYearEvaluateePlanType,
                LastYearFocusedFrameworkNodeShortName = e.LastYearFocusedFrameworkNodeShortName,
                LastYearFocusedSGframeworkNodeShortName = e.LastYearFocusedSGframeworkNodeShortName,
                SuggestedEvaluateePlanType = e.SuggestedEvaluateePlanType,
                SuggestedFocusedFrameworkNodeShortName = e.SuggestedFocusedFrameworkNodeShortName,
                SuggestedFocusedSgframeworkNodeShortName = e.SuggestedFocusedSgframeworkNodeShortName,

    }).OrderBy(x => x.EvaluateeDisplayName).ToList();
        }
    }
}
