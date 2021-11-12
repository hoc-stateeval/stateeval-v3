using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    public class SchoolConfiguration : BaseEntity
    {
        public string SchoolCode { get; set; }
        public bool? IsPrincipalAssignmentDelegated { get; set; }
        public virtual FrameworkContext FrameworkContext { get; set; }
    }
}
