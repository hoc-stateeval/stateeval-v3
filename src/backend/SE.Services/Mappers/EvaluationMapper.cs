using SE.Core.Common;
using SE.Core.Models;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Mappers
{
    public static partial class Mapper
    {
        public static EvaluationSummaryDTO MapToEvaluationSummaryDTO(this Evaluation source)
        {
            EvaluationSummaryDTO target = new EvaluationSummaryDTO();
            target.Id = source.Id;

            target.EvaluateeId = source.EvaluateeId;
            target.EvaluateeDisplayName = source.Evaluatee.FirstName + " " + source.Evaluatee.LastName;
            target.ProfileImageUrl = source.Evaluatee.ProfileImageUrl;

            target.EvaluatorDisplayName = source.Evaluator != null ? (source.Evaluator.FirstName + " " + source.Evaluator.LastName) : "";
            target.EvaluatorId = source.Evaluator != null ? source.Evaluator.Id : null;

            target.WfState = (WfState)source.WfState;
            target.WfStateDisplayName = EnumUtils.MapWfStateToDisplayName((WfState)source.WfState, EnumUtils.MapEvaluationTypeToEvaluateeTerm(source.FrameworkContext.EvaluationType));

            target.SchoolYear = source.FrameworkContext.SchoolYear;
            target.SchoolYearDisplayName = EnumUtils.GetSchoolYearDisplayName(source.FrameworkContext.SchoolYear);

            target.EvaluationType = source.FrameworkContext.EvaluationType;
            target.EvaluationTypeDisplayName = EnumUtils.EvaluationTypeDisplayName(source.FrameworkContext.EvaluationType);

            target.PlanType = source.EvaluateePlanType;
            target.PlanTypeDisplayName = EnumUtils.MapEvaluateePlanTypeToDisplayName(source.EvaluateePlanType);

            target.ComprehensiveCarryForward = source.ComprehensiveCarryForward ?? false;
            target.CarryForwardPerformanceLevel = source.CarryForwardPerformanceLevel ?? RubricPerformanceLevel.UNDEFINED;
            target.CarryForwardSchoolYear = source.CarryForwardSchoolYear ?? SchoolYear.UNDEFINED;

            target.FocusedFrameworkNodeId = source.FocusedFrameworkNodeId;
            target.FocusedSGFrameworkNodeId = source.FocusedSGFrameworkNodeId;
            target.ModifiedCompFocusedFrameworkNode2Id = source.ModifiedCompFocusedFrameworkNode2Id;
            target.FocusedFrameworkNodeShortName = source.FocusedFrameworkNode?.ShortName ?? "";
            target.FocusedSGFrameworkNodeShortName = source.FocusedSGFrameworkNode?.ShortName ?? "";
            target.ModifiedCompFocusedFrameworkNode2ShortName = source.ModifiedCompFocusedFrameworkNode2?.ShortName ?? "";

            target.LastYearEvaluateePlanType = source.LastYearEvaluateePlanType;
            target.LastYearEvaluateePlanTypeDisplayName = EnumUtils.MapEvaluateePlanTypeToDisplayName(source.LastYearEvaluateePlanType);
            target.NextYearEvaluateePlanType = source.NextYearEvaluateePlanType;
            target.NextYearEvaluateePlanTypeDisplayName = EnumUtils.MapEvaluateePlanTypeToDisplayName(source.NextYearEvaluateePlanType);
            target.LastYearFocusedFrameworkNodeShortName = source.LastYearFocusedFrameworkNodeShortName;
            target.LastYearFocusedSGframeworkNodeShortName = source.LastYearFocusedSGframeworkNodeShortName;
            target.SuggestedEvaluateePlanType = source.SuggestedEvaluateePlanType;
            target.SuggestedFocusedFrameworkNodeShortName = source.SuggestedFocusedFrameworkNodeShortName;
            target.SuggestedFocusedSGframeworkNodeShortName = source.SuggestedFocusedSGframeworkNodeShortName;

            target.PerformanceLevel = source.PerformanceLevel ?? RubricPerformanceLevel.UNDEFINED;
            target.PerformanceLevelDisplayName = EnumUtils.MapPerformanceLeveltoDisplayName(source.PerformanceLevel);

            target.LockDateTime = source.LockDateTime;

            return target;
        }
    }
}
