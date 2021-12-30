using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("FrameworkContext")]
    public class FrameworkContext : BaseEntity
    {
        [MaxLength(100)]
        [Required]
        public string Name { get; set; }
        public SchoolYear SchoolYear { get; set; }

        [MaxLength(20)]
        [Required]
        public string DistrictCode { get; set; }
        public EvaluationType EvaluationType { get; set; }

        [MaxLength(20)]
        [Required]
        public string FrameworkTagName { get; set; }
        public FrameworkViewType FrameworkViewType { get; set; }
        public DateTime LoadDateTime { get; set; }


        [ForeignKey("StateFramework")]
        public long StateFrameworkId { get; set; }

        [Required]
        public virtual Framework StateFramework { get; set; }

        [ForeignKey("InstructionalFramework")]
        public long? InstructionalFrameworkId { get; set; }
        public virtual Framework InstructionalFramework { get; set; }

        [ForeignKey("DefaultFramework")]
        public long DefaultFrameworkId { get; set; }
        [Required]
        public virtual Framework DefaultFramework { get; }

        [ForeignKey("PrototypeFrameworkContext")]
        public long PrototypeFrameworkContextId { get; set; }
        [Required]
        public virtual FrameworkContextPrototype PrototypeFrameworkContext { get; set; }

        [ForeignKey("EvaluateeRole")]
        public long EvaluateeRoleId { get; set; }

        [Required]
        public virtual Role EvaluateeRole { get; set; }
    }
}
