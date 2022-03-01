using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("PerceptionSurveyPerceptionSurveyStatement")]
    public class PerceptionSurveyPerceptionSurveyStatement
    {
        [ForeignKey("PerceptionSurvey")]
        public long PerceptionSurveyId { get; set; }
        public virtual PerceptionSurvey PerceptionSurvey { get; }

        [ForeignKey("PerceptionSurveyStatement")]
        public long PerceptionSurveyStatementId { get; set; }
        public virtual PerceptionSurveyStatement PerceptionSurveyStatement { get; }
    }
}
