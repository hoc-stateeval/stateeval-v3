using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    public class Evaluation : BaseEntity
    {
        public DateTime CreationDateTime { get; set; }
        public bool IsActive { get; set; }
        public string DeactivateMessage { get; set; }

        public EvaluationType EvaluationType { get; set; }
        public SchoolYear SchoolYear { get; set; }
        public WfState WfState { get; set; }
        public string DistrictCode { get; set; }
        public string SchoolCode { get; set; }
        public RubricPerformanceLevel? PerformanceLevel { get; set; }
        public StudentGrowthImpactRating? StudentGrowthImpactRating { get; set; }
        public bool? ComprehensiveCarryForward { get; set; }
        public RubricPerformanceLevel? ComprehensiveCarryForwardPerformanceLevel { get; set; }
        public SchoolYear? ComprehensiveCarryForwardSchoolYear { get; set; }
        public EvaluateePlanType? EvaluateePlanType { get; set; }
        public EvaluateePlanType? LastYearEvaluateePlanType { get; set; }
        public EvaluateePlanType? NextYearEvaluateePlanType { get; set; }
        public string LastYearFocusedFrameworkNodeShortName { get; set; }
        public string LastYearFocusedSGframeworkNodeShortName { get; set; }
        public EvaluateePlanType? SuggestedEvaluateePlanType { get; set; }
        public string SuggestedFocusedFrameworkNodeShortName { get; set; }
        public string SuggestedFocusedSgframeworkNodeShortName { get; set; }
        public bool? Complete { get; set; }
        public bool? ByPassSGScores { get; set; }
        public string SGScoreOverrideComment { get; set; }
        public bool? ByPassReceipt { get; set; }
        public string ByPassReceiptOverrideComment { get; set; }
        public bool? DropToPaper { get; set; }
        public string DropToPaperOverrideComment { get; set; }

        public DateTime? MarkedFinalDateTime { get; set; }
        public DateTime? SendFinalDateTime { get; set; }
        public DateTime? FinalAcknowledgementSentDateTime { get; set; }
        public DateTime? LockDateTime { get; set; }
        public DateTime? EvaluateeFinalReportViewDateTime { get; set; }
        public DateTime? EOYConfDateTime { get; set; }
        public DateTime? SelfEvalSentDate { get; set; }
        public DateTime? SelfEvalCompleteDateTime { get; set; }
        public DateTime? PromptsTorSentDate { get; set; }
        public DateTime? PromptsTeeSentDate { get; set; }

        public bool? AutoSubmitAfterReceipt { get; set; }

        public string EvaluateeReflections { get; set; }
        public string EvaluatorRecommendations { get; set; }

        public bool? EvaluateeReflectionsIsPublic { get; set; }
        public bool? MidYearReportsShared { get; set; }
        public bool? EvaluatorScoresShared { get; set; }
        public bool? FinalReportShared { get; set; }
        public bool? SelfEvalComplete { get; set; }
        public bool? SelfEvalShared { get; set; }
        public bool? VisibleToEvaluatee { get; set; }

        public long EvaluateeId { get; set; }
        public virtual User Evaluatee { get; set; }

        public long? EvaluatorId { get; set; }
        public virtual User? Evaluator { get; set; }

        public long? FocusedFrameworkNodeId { get; set; }
        public virtual FrameworkNode? FocusedFrameworkNode { get; set; }

        public long? FocusedSGFrameworkNodeId { get; set; }
        public virtual FrameworkNode? FocusedSGFrameworkNode { get; set; }
        public virtual FrameworkNode? ModifiedCompFocusedFrameworkNode2 { get; set; }
        public virtual FrameworkNode? NextYearFocusedFrameworkNode { get; set; }
        public virtual FrameworkNode? NextYearFocusedSGframeworkNode { get; set; }
    }
}
