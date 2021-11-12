using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    public class Role : BaseEntity
    {
        public string EDSName { get; }
        public string DisplayName { get; }
    }
}
