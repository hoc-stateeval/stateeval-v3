using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("SelfAssessment")]
    public class SelfAssessment : BaseRecurringEvidenceCollection
    {
        public EvaluateePlanType EvaluateePlanType { get; set; }
    }
}
