using SE.Core.Models;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Queries.Assignments
{
    public class SchoolSummaryAssignmentDataDTO
    {
        public string SchoolName { get; set; }
        public string SchoolCode { get; set; }
        public int TotalCount { get; set; }
        public int AssignedCount { get; set; }
        public int UnassignedCount { get; set; }
        public List<UserDTO> Evaluators { get; set; }
        public List<RoleType> EvaluatorRoleTypes { get; set; }
    }
}
