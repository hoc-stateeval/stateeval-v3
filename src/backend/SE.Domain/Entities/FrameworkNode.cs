using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("FrameworkNode")]
    public class FrameworkNode : BaseEntity
    {
        [MaxLength(50)]
        [Required]
        public string ShortName { get; set; }

        [MaxLength(250)]
        [Required]
        public string Title { get; set; }

        [MaxLength(20)]
        [Required]
        public string FrameworkTagName { get; set; }
        public bool IsStudentGrowthAligned { get; set; }

        public SchoolYear SchoolYear { get; set; }
        public int Sequence { get; set; }

        public long FrameworkId { get; set; }

        [ForeignKey("FrameworkId")]
        [Required]
        public virtual Framework Framework { get; set; }
        public virtual List<FrameworkNodeRubricRow> FrameworkNodeRubricRows { get; }
    }
}
