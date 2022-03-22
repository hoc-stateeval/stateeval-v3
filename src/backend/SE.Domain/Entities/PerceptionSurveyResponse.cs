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

        [ForeignKey("SurveyId")]
        public long SurveyId { get; set; }

        public virtual PerceptionSurvey PerceptionSurvey { get; set; }

        [ForeignKey("StatementId")]
        public long StatementId { get; set; }
        public virtual PerceptionSurveyStatement PerceptionSurveyStatement { get; set; }
    }
}
