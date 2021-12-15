using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class EvaluationSummaryDTO
    {
        public long Id { get; set; }

        public long EvaluateeId { get; set; }
        public long EvaluatorId { get; set; }

        public EvaluationType EvaluationType { get; set; }
        public string EvaluationTypeDisplayName { get; set; }

        public string ProfileImageUrl { get; set; }

        public string EvaluateeDisplayName { get; set; }
        public string EvaluatorDisplayName { get; set; }

        public WfState WfState { get; set; }
        public string WfStateDisplayName { get; set; }
        public DateTime? LockDateTime { get; set; }

        public EvaluateePlanType? PlanType { get; set; }
        public string PlanTypeDisplayName { get; set; }

        public RubricPerformanceLevel? PerformanceLevel { get; set; }
        public StudentGrowthImpactRating? StudentGrowthImpactRating { get; set; }
        public bool? ComprehensiveCarryForward { get; set; }
        public RubricPerformanceLevel? ComprehensiveCarryForwardPerformanceLevel { get; set; }
        public SchoolYear? ComprehensiveCarryForwardSchoolYear { get; set; }

        public long? FocusedFrameworkNodeId { get; set; }
        public string FocusedFrameworkNodeDisplayName { get; set; }

        public long? FocusedSGFrameworkNodeId { get; set; }
        public string FocusedSGFrameworkNodeDisplayName { get; set; }

        public long? ModifiedCompFocusedFrameworkNode2Id { get; set; }
        public string ModifiedCompFocusedFrameworkNode2DisplayName { get; set; }


        public EvaluateePlanType? LastYearEvaluateePlanType { get; set; }
        public string LastYearEvaluateePlanTypeDisplayName { get; set; }
        public EvaluateePlanType? NextYearEvaluateePlanType { get; set; }
        public string NextYearEvaluateePlanTypeDisplayName { get; set; }
        public string LastYearFocusedFrameworkNodeShortName { get; set; }
        public string LastYearFocusedSGframeworkNodeShortName { get; set; }
        public EvaluateePlanType? SuggestedEvaluateePlanType { get; set; }
        public string SuggestedFocusedFrameworkNodeShortName { get; set; }
        public string SuggestedFocusedSGframeworkNodeShortName { get; set; }

    }
}
