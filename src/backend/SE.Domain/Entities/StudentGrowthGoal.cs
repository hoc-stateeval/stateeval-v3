using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("StudentGrowthGoal")]
    public class StudentGrowthGoal : BaseEntity
    {
        [MaxLength(250)]
        public string Title { get; set; }
        public string GoalStatement { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreationDateTime { get; set; }


        [ForeignKey("Evaluation")]
        public long EvaluationId { get; set; }
        [Required]
        public virtual Evaluation Evaluation { get; set; }

        [ForeignKey("FrameworkNode")]
        public long FrameworkNodeId { get; set; }
        [Required]
        public virtual FrameworkNode FrameworkNode { get; set; }

        [ForeignKey("GoalBundle")]
        public long BundleId { get; set; }
        [Required]
        public virtual StudentGrowthGoalBundle GoalBundle { get; set; }

        [ForeignKey("ProcessRubricRow")]
        public long? ProcessRubricRowId { get; set; }
        public virtual RubricRow? ProcessRubricRow { get; set; }

        [ForeignKey("ResultsRubricRow")]
        public long? ResultsRubricRowId { get; set; }
        public virtual RubricRow? ResultsRubricRow { get; set; }
    }
}
