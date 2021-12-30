using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class SchoolTeacherAssignmentsSummaryDTO
    {
        public List<EvaluationSummaryDTO> EvaluationSummaries { get; set; }  

        public List<UserDTO> Evaluatees { get; set; } 
        public List<UserDTO> Principals { get; set; }
        public List<UserDTO> DistrictWideTeacherEvaluators { get; set; }
    }
}
