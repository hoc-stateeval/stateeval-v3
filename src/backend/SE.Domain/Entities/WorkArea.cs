using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    public class WorkArea : BaseEntity
    {
        [MaxLength(50)]
        [Required]
        public string Title { get; set; }


        [MaxLength(20)]
        [Required]
        public string TagName { get; set; }

        public virtual EvaluationType EvaluationType { get; set; }

        [Required]
        public virtual Role Role { get; set; }

        [Required]
        public virtual Role EvaluateeRole { get; set; }

        public bool IsEvaluatee { get; set; }
        public bool IsEvaluator { get; set; }

        public bool IsSchoolAdmin { get; set; }
        public bool IsDistrictAdmin { get; set; }
        public int Priority { get; set; }
    }
}
