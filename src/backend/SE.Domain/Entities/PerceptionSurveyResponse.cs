using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("PerceptionSurveyResponse")]
    public class PerceptionSurveyResponse : BaseEntity
    {
        [Required]
        public PerceptionSurveyLevelOfAgreement LevelOfAgreement { get; set; }

        [Required]
        public Guid RespondentId { get; set; }

        [ForeignKey("PerceptionSurveyId")]
        public long PerceptionSurveyId { get; set; }

        public virtual PerceptionSurvey PerceptionSurvey { get; set; }

        [ForeignKey("PerceptionSurveyStatementId")]
        public long PerceptionSurveyStatementId { get; set; }
        public virtual PerceptionSurveyStatement PerceptionSurveyStatement { get; set; }
    }
}
