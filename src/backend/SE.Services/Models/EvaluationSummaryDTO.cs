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

        public string ProfileImageUrl { get; set; }

        public string EvaluateeDisplayName { get; set; }
        public string EvaluatorDisplayName { get; set; }

        public WfState WfState { get; set; }
        public string WfStateDisplayName { get; set; }
        public DateTime? LockDateTime { get; set; }

        public EvaluateePlanType? PlanType { get; set; }
        public string EvaluateePlanTypeDisplayName { get; set; }

        public RubricPerformanceLevel? PerformanceLevel { get; set; }
        public StudentGrowthImpactRating? StudentGrowthImpactRating { get; set; }
        public bool? ComprehensiveCarryForward { get; set; }
        public RubricPerformanceLevel? ComprehensiveCarryForwardPerformanceLevel { get; set; }
        public SchoolYear? ComprehensiveCarryForwardSchoolYear { get; set; }

        public long? FocusedFrameworkNodeId { get; set; }
        public string FocusedFrameworkNodeDisplayName { get; set; }

        public long? FocusedSGFrameworkNodeId { get; set; }
        public string FocusedSGFrameworkNodeDisplayName { get; set; }

    }
}
