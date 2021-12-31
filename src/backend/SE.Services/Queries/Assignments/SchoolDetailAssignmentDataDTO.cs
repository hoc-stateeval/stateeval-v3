using SE.Core.Models;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Queries.Assignments
{
    public class SchoolDetailAssignmentDataDTO
    {
        public List<EvaluationSummaryDTO> EvaluationSummaries { get; set; }  
        public List<UserDTO> Evaluatees { get; set; }
        public List<UserDTO> Evaluators { get; set; }
        public List<RoleType> EvaluatorRoleTypes { get; set; }
    }
}
