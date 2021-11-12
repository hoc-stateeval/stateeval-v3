using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    // TODO: add-migration is making this class plural. can't figure out why because I 
    // have it specified in the configuration to be singular. So I am setting it
    // here and that seems to work.

    [Table("WorkAreaContext")]
    public class WorkAreaContext : BaseEntity
    {
        public virtual Building Building { get; set; }

        public long UserId { get; set; }
        public virtual User User { get; set; }
        public virtual WorkArea WorkArea { get; set; }
        public virtual FrameworkContext FrameworkContext { get; set; }
    }
}
