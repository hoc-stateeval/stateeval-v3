using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class PerceptionSurveyStatementDTO
    {
        public long Id { get; set; }
        public string FrameworkTagName { get; set; } = "";
        public string Text { get; set; } = "";
        public long RubricRowId { get; set; }
    }
}
