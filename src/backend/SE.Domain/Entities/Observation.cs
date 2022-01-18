using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("Observation")]
    public class Observation : BaseRecurringEvidenceCollection 
    {
        public Observation() { 
        }

        public Observation(Evaluation evaluation, User evaluator, string shortName)
        {
            CreationDateTime = DateTime.Now;
            EvaluateePlanType = (EvaluateePlanType)evaluation.EvaluateePlanType;
            EvaluationId = evaluation.Id;
            EvaluatorId = evaluation.Id;
            ShortName = shortName;
            Title = shortName;
        }

        [ForeignKey("Evaluation")]
        public long EvaluationId { get; }

        [Required]
        public virtual Evaluation Evaluation { get; set; }

        [ForeignKey("Evaluator")]
        public long EvaluatorId { get; set; }

        [Required]
        public virtual User Evaluator { get; set; }

        [ForeignKey("Evaluatee")]
        public long EvaluateeId { get; set; }

        [Required]
        public virtual User Evaluatee { get; set; }

        public EvaluateePlanType EvaluateePlanType { get; set; }

    }
}
