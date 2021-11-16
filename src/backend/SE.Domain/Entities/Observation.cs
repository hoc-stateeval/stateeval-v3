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
    public class Observation : BaseEntity
    {
        [MaxLength(50)]
        [Required]
        public string ShortName { get; set; }

        [MaxLength(250)]
        [Required]
        public string Title { get; set; }
        public DateTime CreationDateTime { get; set; }

        public EvaluateePlanType EvaluateePlanType { get; set;}

        [ForeignKey("Evaluation")]
        public long EvaluationId { get; set; }

        [Required]
        public virtual Evaluation Evaluation { get; set; }

        [ForeignKey("Evaluator")]
        public long EvaluatorId { get; set; }

        [Required]
        public virtual User Evaluator { get; set; }

    }
}
