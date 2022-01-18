using System;
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

        [ForeignKey("CreateByUser")]
        public long CreatedByUserId { get; set; }
        public virtual User CreatedByUser { get; }

        public UserPromptType PromptType { get; set; }
        public string Prompt { get; set; }
        public string SchoolCode { get; set; }
        public bool CreatedAsAdmin { get; set; }
        public short Sequence { get; set; }
        public bool Retired { get; set; }

        public bool Private { get; set; }

        // observation-specific conference prompts
        [ForeignKey("Observation")]
        public long? ObservationId { get; set; }
        public virtual Observation Observation { get; }


        // summative reflections
        [ForeignKey("Evaluation")]
        public long? EvaluationId { get; set; }
        public virtual Evaluation Evaluation { get; }


        public virtual List<UserPromptGroupUserPrompt> UserPromptGroupUserPrompts { get; set; }
        public virtual List<UserPromptResponse> Responses { get; set; }

    }
}
