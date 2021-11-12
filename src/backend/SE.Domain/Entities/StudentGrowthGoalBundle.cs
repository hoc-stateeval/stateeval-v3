using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
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
        public bool? SharingDraft { get; set; }
        public bool EvaluatorScoresShared { get; set; }
        public DateTime? GoalSettingConfDateTime { get; set; }
        public DateTime? ProcessCompleteDateTime { get; set; }
        public DateTime? ProcessSharedDateTime { get; set; }

        public virtual User Evaluatee { get; set; }

        public long EvaluationId { get; set; }
        public virtual Evaluation Evaluation { get; set; }
        public virtual ICollection<StudentGrowthGoal> Goals { get; set; }
    }
}
