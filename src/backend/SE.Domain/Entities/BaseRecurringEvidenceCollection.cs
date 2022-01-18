using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    public abstract class BaseRecurringEvidenceCollection : BaseEntity
    {
        [MaxLength(50)]
        [Required]
        public string ShortName { get; set; }

        [MaxLength(250)]
        [Required]
        public string Title { get; set; }

        public DateTime CreationDateTime { get; set; }

        [ForeignKey("CreateByUser")]
        public long CreatedByUserId { get; set; }

        [Required]
        public virtual User CreatedByUser { get; set; }

        [ForeignKey("Evaluation")]
        public long EvaluationId { get; }

        [Required]
        public virtual Evaluation Evaluation { get; set; }
    }
}
