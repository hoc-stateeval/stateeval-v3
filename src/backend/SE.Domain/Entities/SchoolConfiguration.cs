using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("SchoolConfiguration")]
    public class SchoolConfiguration : BaseEntity
    {
        [MaxLength(20)]
        [Required]
        public string SchoolCode { get; set; }
        public bool IsPrincipalAssignmentDelegated { get; set; }

        [ForeignKey("FrameworkContext")]
        public long FrameworkContextId { get; set; }

        [Required]
        public virtual FrameworkContext FrameworkContext { get; set; }
    }
}
