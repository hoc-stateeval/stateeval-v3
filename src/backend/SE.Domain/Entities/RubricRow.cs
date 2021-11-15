using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("RubricRow")]
    public class RubricRow : BaseEntity
    {
        [MaxLength(50)]
        [Required]
        public string ShortName { get; set; }

        [MaxLength(350)]
        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }
        public SchoolYear SchoolYear { get; set; }

        [MaxLength(20)]
        [Required]
        public string FrameworkTagName { get; set; }
        public bool IsStudentGrowthAligned { get; set; }

        [Required]
        public string PL1Descriptor { get; set; }
        [Required]
        public string PL2Descriptor { get; set; }
        [Required]
        public string PL3Descriptor { get; set; }
        [Required]
        public string PL4Descriptor { get; set; }

        public string LookFor1 { get; set; }
        public string LookFor2 { get; set; }
        public string LookFor3 { get; set; }
        public string LookFor4 { get; set; }

        public virtual ICollection<FrameworkNodeRubricRow> FrameworkNodeRubricRows { get; }
    }
}
