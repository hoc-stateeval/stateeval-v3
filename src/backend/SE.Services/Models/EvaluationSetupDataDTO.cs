using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class EvaluationSetuDataDTO
    {
        public List<EvaluationSummaryDTO> EvaluationSummaries { get; set; } = new List<EvaluationSummaryDTO>();
        public List<UserDTO> Evaluatees { get; set; } = new List<UserDTO>();
        public List<UserDTO> Evaluators { get; set; } = new List<UserDTO>();
        public List<RoleType> EvaluatorRoleTypes { get; set; } = new List<RoleType>();
    }
}
