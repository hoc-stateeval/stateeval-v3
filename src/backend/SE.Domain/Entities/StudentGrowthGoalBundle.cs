using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("StudentGrowthGoalBundle")]
    public class StudentGrowthGoalBundle : BaseEntity
    {
        public EvaluationType EvaluationType { get; set; }
        public WfState WfState { get; set; }
        public bool InRevision { get; set; }
        public string EvaluatorProcessConfNotes { get; set; }
        public string EvaluateeProcessConfNotes { get; set; }
        public string EvaluatorMidConfNotes { get; set; }
        public string EvaluateeMidConfNotes { get; set; }
        public string EvaluatorEoyconfNotes { get; set; }
        public string EvaluateeEoyconfNotes { get; set; }
        public bool SharingDraft { get; set; }
        public bool EvaluatorScoresShared { get; set; }
        public DateTime? GoalSettingConfDateTime { get; set; }
        public DateTime? ProcessCompleteDateTime { get; set; }
        public DateTime? ProcessSharedDateTime { get; set; }


        [ForeignKey("Evaluation")]
        public long EvaluationId { get; set; }

        [Required]
        public virtual Evaluation Evaluation { get; set; }

        public virtual List<StudentGrowthGoal> Goals { get; set; }
    }
}
