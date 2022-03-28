using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SE.Domain.Entities
{

    [Table("UserPrompt")]
    public class UserPrompt : BaseEntity
    {
        [ForeignKey("FrameworkContext")]
        public long FrameworkContextId { get; set; }
        public virtual FrameworkContext FrameworkContext { get; }
        public UserPromptTier OwnerTier { get; set; }
        public string SchoolCode { get; set; }
        [ForeignKey("Evaluator")]
        public long? EvaluatorId { get; set; }
        public virtual User Evaluator { get; }

        public bool DistrictDefinedOnly { get; set; }

        public UserPromptType PromptType { get; set; }
        public string Prompt { get; set; }

        // observation-specific conference prompts
        [ForeignKey("Observation")]
        public long? ObservationId { get; set; }
        public virtual Observation Observation { get; }

        // summative reflections
        [ForeignKey("Evaluation")]
        public long? EvaluationId { get; set; }
        public virtual Evaluation Evaluation { get; }

        public virtual List<UserPromptTierConfig> TierConfigs { get; set; } = new List<UserPromptTierConfig>();

        public virtual List<UserPromptResponse> Responses { get; set; } = new List<UserPromptResponse>();

    }
}
