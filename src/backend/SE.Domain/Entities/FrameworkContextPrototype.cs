using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("FrameworkContextPrototype")]
    public class FrameworkContextPrototype : BaseEntity
    {
        [MaxLength(100)]
        [Required]
        public string Name { get; set; }
        public SchoolYear SchoolYear { get; set; }
        public EvaluationType EvaluationType { get; set; }

        [MaxLength(20)]
        [Required]
        public string FrameworkTagName { get; set; }

        [ForeignKey("StateFramework")]
        public long StateFrameworkId { get; set; }

        [Required]
        public virtual Framework StateFramework { get; set; }

        [ForeignKey("InstructionalFramework")]
        public long? InstructionalFrameworkId { get; set; }
        public virtual Framework? InstructionalFramework { get; set; }
    }
}
