using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("Evaluation")]
    public class Evaluation : BaseEntity
    {
        public DateTime CreationDateTime { get; set; }
        public bool IsActive { get; set; }
        public string DeactivateMessage { get; set; }
        
        public WfState WfState { get; set; }

        [MaxLength(20)]
        public string SchoolCode { get; set; }
        public RubricPerformanceLevel? PerformanceLevel { get; set; }
        public StudentGrowthImpactRating? StudentGrowthImpactRating { get; set; }
        public bool? ComprehensiveCarryForward { get; set; }
        public RubricPerformanceLevel? CarryForwardPerformanceLevel { get; set; }
        public SchoolYear? CarryForwardSchoolYear { get; set; }
        public EvaluateePlanType? EvaluateePlanType { get; set; }
        public EvaluateePlanType? LastYearEvaluateePlanType { get; set; }
        public EvaluateePlanType? NextYearEvaluateePlanType { get; set; }

        [MaxLength(20)]
        public string LastYearFocusedFrameworkNodeShortName { get; set; }

        [MaxLength(20)]
        public string LastYearFocusedSGframeworkNodeShortName { get; set; }
        public EvaluateePlanType? SuggestedEvaluateePlanType { get; set; }

        [MaxLength(20)]
        public string SuggestedFocusedFrameworkNodeShortName { get; set; }

        [MaxLength(20)]
        public string SuggestedFocusedSGframeworkNodeShortName { get; set; }
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

        [ForeignKey("FrameworkContext")]
        public long FrameworkContextId { get; set; }
        [Required]
        public virtual FrameworkContext FrameworkContext { get; set; }

        [ForeignKey("Evaluatee")]
        public long EvaluateeId { get; set; }
        [Required]
        public virtual User Evaluatee { get; set; }

        [ForeignKey("Evaluator")]
        public long? EvaluatorId { get; set; }
        public virtual User Evaluator { get; set; }

        [ForeignKey("FocusedFrameworkNode")]
        public long? FocusedFrameworkNodeId { get; set; }
        public virtual FrameworkNode FocusedFrameworkNode { get; set; }

        [ForeignKey("FocusedSGFrameworkNode")]
        public long? FocusedSGFrameworkNodeId { get; set; }
        public virtual FrameworkNode FocusedSGFrameworkNode { get; set; }

        [ForeignKey("ModifiedCompFocusedFrameworkNode2")]
        public long? ModifiedCompFocusedFrameworkNode2Id { get; set; }
        public virtual FrameworkNode ModifiedCompFocusedFrameworkNode2 { get; set; }

        [ForeignKey("NextYearFocusedFrameworkNode")]
        public long? NextYearFocusedFrameworkNodeId { get; set; }
        public virtual FrameworkNode NextYearFocusedFrameworkNode { get; set; }

        [ForeignKey("NextYearFocusedSGframeworkNode")]
        public long? NextYearFocusedSGframeworkNodeId { get; set; }
        public virtual FrameworkNode NextYearFocusedSGframeworkNode { get; set; }

    }
}
