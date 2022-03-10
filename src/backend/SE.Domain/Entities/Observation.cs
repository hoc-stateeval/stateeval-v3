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

        public Observation(Evaluation evaluation, User evaluator, string shortName, ObservationType observationType)
            :base(shortName, shortName, DateTime.Now, evaluator.Id, evaluation.Id)
        {
            EvaluateePlanType = (EvaluateePlanType)evaluation.EvaluateePlanType;
            EvaluatorId = evaluator.Id;
            SchoolCode = evaluation.SchoolCode;
            ObservationType = observationType;
            WfState = WfState.OBS_IN_PROGRESS_TOR;
        }

        [ForeignKey("Evaluator")]
        public long EvaluatorId { get; set; }

        [Required]
        public virtual User Evaluator { get; set; }

        public EvaluateePlanType EvaluateePlanType { get; set; }

        public ObservationType ObservationType { get; set; }

        [MaxLength(20)]
        [Required]
        public string SchoolCode { get; set; }

        public WfState WfState { get; set; }

    }
}
