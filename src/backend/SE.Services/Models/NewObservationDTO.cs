using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class NewObservationDTO
    {
        public long EvaluationId { get; }
        public string ShortName { get; } = "";
        public EvaluateePlanType PlanType { get; }
        public long EvaluatorId { get; }
    }
}
