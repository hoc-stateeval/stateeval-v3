using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    public class StudentGrowthGoal : BaseEntity
    {
        public string Title { get; set; }
        public string GoalStatement { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreationDateTime { get; set; }

        public virtual User Evaluatee { get; set; }
        public virtual Evaluation Evaluation { get; set; }
        public virtual FrameworkNode FrameworkNode { get; set; }

        public long BundleId { get; set; }
        public long? ProcessRubricRowId { get; set; }
        public long? ResultsRubricRowId { get; set; }
        public virtual StudentGrowthGoalBundle GoalBundle { get; set; }
        public virtual RubricRow ProcessRubricRow { get; set; }
        public virtual RubricRow ResultsRubricRow { get; set; }
    }
}
