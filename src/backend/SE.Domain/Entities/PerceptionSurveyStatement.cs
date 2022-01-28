using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("PerceptionSurveyStatement")]
    public class PerceptionSurveyStatement : BaseEntity
    {
        [MaxLength(10)]
        [Required]
        public string FrameworkTagName { get; set; }

        [Required]
        public string Text { get; set; }

        [ForeignKey("RubricRowId")]
        public long RubricRowId { get; set; }
        public virtual RubricRow RubricRow { get; set; }
    }
}
