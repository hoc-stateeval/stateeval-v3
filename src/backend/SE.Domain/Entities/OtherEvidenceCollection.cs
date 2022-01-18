using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("OtherEvidenceCollection")]
    public class OtherEvidenceCollection : BaseEntity
    {
        [ForeignKey("Evaluation")]
        public long EvaluationId { get; }

        public virtual Evaluation Evaluation { get; set; }
    }
}
