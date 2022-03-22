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
        public long SurveyId { get; set; }

        public string Ethnicities { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;

    
   
    }
}
