using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class DistrictTeacherAssignmentsSummaryDTO
    {
        public string SchoolName { get; set; }
        public string SchoolCode { get; set; }
        public int TotalCount { get; set; }
        public int AssignedCount { get; set; }
        public int UnassignedCount { get; set; }
        public bool Delegated { get; set; }
        public int PendingDTERequestCount { get; set; }
        public List<string> PrincipalNames { get; set; }

    }
}
