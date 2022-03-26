using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SE.Domain.Entities
{


    [Table("UserPromptTierConfig")]
    public class UserPromptTierConfig : BaseEntity
    {
        [ForeignKey("UserPrompt")]
        public long UserPromptId { get; set; }
        public virtual UserPrompt UserPrompt { get; }

        public UserPromptTier ConfigurationTier { get; set; }

        [ForeignKey("Evaluator")]
        public long? EvaluatorId { get; set; }
        public virtual User Evaluator { get; }

        public string SchoolCode { get; set; } = String.Empty;
        public bool Required { get; set; } 

    }
}
