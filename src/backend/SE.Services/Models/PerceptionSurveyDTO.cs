using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class PerceptionSurveyDTO
    {
        public long Id { get; set; }
        public long EvaluationId { get; set; }
        public string SchoolCode { get; set; } = "";
        public string Title { get; set; } = "";
        public string TinyURL { get; set; } = "";
        public WfState WfState { get; set;  }
        public string WfStateDisplayName { get; set; } = "";
    }
}
