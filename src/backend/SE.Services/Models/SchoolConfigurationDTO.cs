using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class SchoolConfigurationDTO
    {
        public long Id { get; set; }
        public long FrameworkContextId { get; set; }
        public string SchoolCode { get; set; } = string.Empty;

        public bool IsPrincipalAssignmentDelegated { get; set; }
    }
}
