using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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

        [ForeignKey("PerceptionSurveyStatement")]
        public long PerceptionSurveyStatementId { get; set; }

        [Required]
        public virtual PerceptionSurvey PerceptionSurvey { get; set; }

        [Required]
        public virtual PerceptionSurveyStatement PerceptionSurveyStatement { get; set; }
    }
}
