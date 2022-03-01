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
            :base(shortName, shortName, DateTime.Now, evaluator.Id, evaluation.Id)
        {
            EvaluateePlanType = (EvaluateePlanType)evaluation.EvaluateePlanType;
            EvaluatorId = evaluation.Id;
        }


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
