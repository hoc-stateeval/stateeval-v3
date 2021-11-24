using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class EvaluationTimelinessStatusDTO
    {
        public long Id { get; set; }

        public long EvaluateeId { get; set; }

        public EvaluationType EvaluationType { get; set; }
        public string EvaluationTypeDisplayName { get; set; }
        public string EvaluateeDisplayName { get; set; }
        public string EvaluatorDisplayName { get; set; }
        public string WfStateDisplayName { get; set; }
        public DateTime? LockDateTime { get; set; }
        public string EvaluateePlanTypeDisplayName { get; set; }

        public RubricPerformanceLevel? PerformanceLevel { get; set; }
        public StudentGrowthImpactRating? StudentGrowthImpactRating { get; set; }
        public bool? ComprehensiveCarryForward { get; set; }
        public RubricPerformanceLevel? ComprehensiveCarryForwardPerformanceLevel { get; set; }
        public SchoolYear? ComprehensiveCarryForwardSchoolYear { get; set; }
        public string FocusedFrameworkNodeDisplayName { get; set; }
        public string FocusedSGFrameworkNodeDisplayName { get; set; }

        public string ReportSentToTeacherDate { get; set; }
        public string ReportViewedByTeacherDate { get; set; }
        public string ReportMarkedCompleteDate { get; set; }

        public string Overrides { get; set; }

    }
}
