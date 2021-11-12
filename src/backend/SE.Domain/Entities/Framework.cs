using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    public class Framework : BaseEntity
    {
        public string Name { get; }
        public SchoolYear SchoolYear { get; }
        public string FrameworkTagName { get; }
        public virtual ICollection<FrameworkNode> FrameworkNodes { get; }
    }
}
