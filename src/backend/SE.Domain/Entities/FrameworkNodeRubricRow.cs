using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("FrameworkNodeRubricRow")]
    public class FrameworkNodeRubricRow
    {
        public int Sequence { get; set; }

        [ForeignKey("FrameworkNode")]
        public long FrameworkNodeId { get; set; }

        [ForeignKey("RubricRow")]
        public long RubricRowId { get; set; }

        [Required]
        public virtual FrameworkNode FrameworkNode { get; set; }

        [Required]
        public virtual RubricRow RubricRow { get; set; }
    }
}
