using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("PerceptionSurvey")]
    public class PerceptionSurvey : BaseEntity
    {
        public long EvaluationId { get; set; }
        [MaxLength(200)]
        [Required]
        public string Title { get; set; }

        [MaxLength(20)]
        [Required]
        public string SchoolCode { get; set; }
        public DateTime? CompletionDateTime { get; set; }
        public string TinyURL { get; set; } 
        public string Guid { get; set; }

        public WfState WfState { get; set; }

        public virtual List<PerceptionSurveyPerceptionSurveyStatement> PerceptionSurveyPerceptionSurveyStatements { get; }

    }
}
