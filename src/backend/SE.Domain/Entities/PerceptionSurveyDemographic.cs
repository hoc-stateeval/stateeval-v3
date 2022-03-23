using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("PerceptionSurveyDemographic")]
    public class PerceptionSurveyDemographic : BaseEntity
    {
        public long Id { get; set; }

        [ForeignKey("PerceptionSurveyId")]
        public long PerceptionSurveyId { get; set; }
        public virtual PerceptionSurvey PerceptionSurvey { get; set; }

        public string Ethnicities { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;

    
   
    }
}
