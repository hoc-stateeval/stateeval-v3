using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class ObservationDTO
    {
        public long Id { get; set; }
        public long EvaluationId { get; set; }
        public string ShortName { get; set; } = "";
        public string Title { get; set; } = "";
        public EvaluateePlanType EvaluateePlanType { get; set; }
        public DateTime CreationDateTime { get; set; }

        public Guid? ObservationNoteClientId { get; set; }
    }
}
