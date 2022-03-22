using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    /// <summary>
    /// Represent the summary information about an evaluation that is used outside of th context
    /// of the Summative Evaluation section of eval.
    /// </summary>
    public class EvaluationSummaryDTO
    {
        /// <summary>
        /// The evaluation id
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// The id of the user to which the evaluation belongs
        /// </summary>
        public long EvaluateeId { get; set; }
        /// <summary>
        /// The id of the user who is the assigned evaluator for the evaluation
        /// </summary>
        public long? EvaluatorId { get; set; }

        /// <summary>
        /// The framework context associated with the evaluation
        /// </summary>

        public long FrameworkContextId { get; set; }    
        /// <summary>
        /// The school year for the evaluation.
        /// </summary>
        public SchoolYear SchoolYear { get; set; }
        /// <summary>
        /// The school year for the evaluation displayed as a string.
        /// </summary>
        public string SchoolYearDisplayName { get; set; } = "";

        /// <summary>
        /// The type of evaluation, such as Teacher, Principal
        /// </summary>
        public EvaluationType EvaluationType { get; set; }
        /// <summary>
        /// The type of evaluation, displayed as a string
        /// </summary>
        public string EvaluationTypeDisplayName { get; set; } = "";

        /// <summary>
        /// The profile image URI for the user to which the evaluation belongs
        /// </summary>
        public string ProfileImageUrl { get; set; } = "";

        /// <summary>
        /// The display name for the user to which the evaluation belongs, in the form of FirstName LastName
        /// </summary>
        public string EvaluateeDisplayName { get; set; } = "";
        /// <summary>
        /// The display name for the evaluator for the evaluation, in the form of FirstName LastName
        /// </summary>
        public string EvaluatorDisplayName { get; set; } = "";

        /// <summary>
        /// The work state for the evaluation
        /// </summary>
        public WfState WfState { get; set; }
        /// <summary>
        /// The work state for the evaluation as a string.
        /// </summary>
        public string WfStateDisplayName { get; set; } = "";
        /// <summary>
        /// The date on which the evaluation was locked/completed.
        /// </summary>
        public DateTime? LockDateTime { get; set; }

        /// <summary>
        /// The type of plan the evaluation is on, such as Comprehensive, Focused
        /// </summary>
        public EvaluateePlanType? PlanType { get; set; }
        /// <summary>
        /// The type of plan the evaluation is on, as a string
        /// </summary>
        public string PlanTypeDisplayName { get; set; } = "";
        /// <summary>
        /// The final performance level for the evaluation
        /// </summary>

        public RubricPerformanceLevel? PerformanceLevel { get; set; }
        /// <summary>
        /// The final performance level for the evaluation, as a string.
        /// </summary>
        public string PerformanceLevelDisplayName { get; set; } = "";
        /// <summary>
        /// The final student growth impact rating for the evaluation
        /// </summary>
        public StudentGrowthImpactRating? StudentGrowthImpactRating { get; set; }
        /// <summary>
        /// The final student growth impact rating for the evaluation, as a string.
        /// </summary>
        public string StudentGrowthImpactRatingDisplayName { get; set; } = "";
        /// <summary>
        /// Whether the evaluation is configured to carry forward the performance level from
        /// the ,last comprenehsve evaluation. This will be the case when the EvaluateePlanType is Focused.
        /// </summary>
        public bool? ComprehensiveCarryForward { get; set; }
        /// <summary>
        /// The carry-forward performance level from the last comprehensive evaluation.
        /// </summary>
        public RubricPerformanceLevel? CarryForwardPerformanceLevel { get; set; }
        /// <summary>
        /// The carry-forward performance level from the last comprehensive evaluation, as a string.
        /// </summary>
        public string CarryForwardPerformanceLevelDisplayName { get; set; } = "";
        /// <summary>
        /// The carry-forward school year from the last comprehensive evaluation.
        /// </summary>
        public SchoolYear? CarryForwardSchoolYear { get; set; }
        /// <summary>
        /// The framework node id that represents the primary focus for a focused evaluation.
        /// </summary>
        public long? FocusedFrameworkNodeId { get; set; }
        /// <summary>
        /// The framework node id that represents the primary focus for a focused evaluation, as a string.
        /// </summary>
        public string FocusedFrameworkNodeShortName { get; set; } = "";
        /// <summary>
        /// The framework node id that represents the student growth focus for a focused evaluation.
        /// </summary>
        public long? FocusedSGFrameworkNodeId { get; set; }
        /// <summary>
        /// The framework node id that represents the student growth focus for a focused evaluation, as a string.
        /// </summary>
        public string FocusedSGFrameworkNodeShortName { get; set; } = "";
        /// <summary>
        /// The framework node id that represents the secondary focus for a modified comprehensive sevaluation.
        /// </summary>
        public long? ModifiedCompFocusedFrameworkNode2Id { get; set; }
        /// <summary>
        /// The framework node id that represents the secondary focus for a modified comprehensive sevaluation, as a string.
        /// </summary>
        public string ModifiedCompFocusedFrameworkNode2ShortName { get; set; } = "";
        /// <summary>
        /// The plan type for last year's evaluation
        /// </summary>
        public EvaluateePlanType? LastYearEvaluateePlanType { get; set; }
        /// <summary>
        /// The plan type for last year's evaluation, as a string.
        /// </summary>
        public string LastYearEvaluateePlanTypeDisplayName { get; set; } = "";
        /// <summary>
        /// The plan type proposed for current year's evaluation. The value is rolled over from the 
        /// SuggestedEvaluateePlanType from the previoius year at the beginning of the school year 
        /// and used during the assignment proecss.
        /// </summary>
        public EvaluateePlanType? NextYearEvaluateePlanType { get; set; }
        /// <summary>
        /// The plan type proposed for the current year's evaluation, as a string.
        /// </summary>
        public string NextYearEvaluateePlanTypeDisplayName { get; set; } = "";
        /// <summary>
        /// The framework node id for the primary focus for last year's evaluation.
        /// </summary>
        public string LastYearFocusedFrameworkNodeShortName { get; set; } = "";
        /// <summary>
        /// The framework node id for the primary focus for last year's evaluation, as a string.
        /// </summary>
        public string LastYearFocusedSGframeworkNodeShortName { get; set; } = "";
        /// <summary>
        /// The suggested plan type for next year's evaluation. It is filled out at the end of the
        /// year.
        /// </summary>
        public EvaluateePlanType? SuggestedEvaluateePlanType { get; set; }
        /// <summary>
        /// The shortname of the framework node that is the suggested focus for next year's evaluation.
        /// It will only have a value when the suggested plan type is Focused.
        /// </summary>
        public string SuggestedFocusedFrameworkNodeShortName { get; set; } = "";
        /// <summary>
        /// The shortname of the framework node that is the suggested student growth focus for next 
        /// year's evaluation. It will only have a value when the suggested plan type is Focused.
        /// </summary>
        public string SuggestedFocusedSGframeworkNodeShortName { get; set; } = "";

    }
}
