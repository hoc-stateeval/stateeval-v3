using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SE.Domain.Entities
{

    [Table("UserPromptResponse")]
    public class UserPromptResponse : BaseEntity
    {
        public string Response { get; set; }
        public DateTime? LastModifiedDateTime { get; set; }
        public bool DefaultAssignment { get; set; }

        [ForeignKey("UserPrompt")]
        public long UserPromptId { get; set; }
        public virtual UserPrompt UserPrompt { get; }

        [ForeignKey("Evaluation")]
        public long? EvaluationId { get; set; }
        public virtual Evaluation Evaluation { get; }

        [ForeignKey("Observation")]
        public long? ObservationId { get; set; }
        public virtual Observation Observation { get; }
    }
}
