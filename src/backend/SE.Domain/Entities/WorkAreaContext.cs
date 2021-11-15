using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("WorkAreaContext")]
    public class WorkAreaContext : BaseEntity
    {
        [Required]
        public virtual Building Building { get; set; }

        public long UserId { get; set; }
        [Required]
        public virtual User User { get; set; }

        [ForeignKey("WorkArea")]
        public long WorkAreaId { get; set; }
        [Required]
        public virtual WorkArea WorkArea { get; set; }

        [ForeignKey("FrameworkContext")]
        public long FrameworkContextId { get; set; }
        [Required]
        public virtual FrameworkContext FrameworkContext { get; set; }
    }
}
