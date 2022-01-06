using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("Framework")]
    public class Framework : BaseEntity
    {
        [MaxLength(100)]
        [Required]
        public string Name { get; set; }
        public SchoolYear SchoolYear { get; set; }

        [MaxLength(20)]
        [Required]
        public string FrameworkTagName { get; set; }
        public virtual List<FrameworkNode> FrameworkNodes { get; }
    }
}
