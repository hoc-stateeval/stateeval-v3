﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SE.Domain.Entities
{
    public class UserPrompt : BaseEntity
    {
        [ForeignKey("FrameworkContext")]
        public long FrameworkContextId { get; set; }
        public virtual FrameworkContext FrameworkContext { get; }
        public string SchoolCode { get; set; }

        public UserPromptType PromptType { get; set; }
        public string Prompt { get; set; }

        public bool Retired { get; set; }
        public bool Required { get; set; }

        public UserPromptTier OwnerTier { get; set; }  

        [ForeignKey("Evaluator")]
        public long? EvaluatorId { get; set; }
        public virtual User Evaluator { get; }

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
