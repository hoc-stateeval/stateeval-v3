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
        public long EvaluatorId { get; set; }
        public string EvaluatorDisplayName { get; set; } = "";
        public string EvaluateeDisplayName { get; set; } = "";
        public string ShortName { get; set; } = "";
        public string Title { get; set; } = "";
        public EvaluateePlanType EvaluateePlanType { get; set; }

        public ObservationType ObservationType { get; set; }
        public string ObservationTypeDisplayName { get; set; } = "";

        public DateTime CreationDateTime { get; set; }

        public WfState WfState { get; set; }

        public string WfStateDisplayName { get; set; } = "";


        public DateTime PreConferenceDateTime { get; set; }
        public DateTime ObservationDateTime { get; set; }
        public DateTime PostConferenceDateTime { get; set; }
        public short ObservationDuration { get; set; }
        public bool IncludeStudentGrowthComponents { get; set; }
    }
}
