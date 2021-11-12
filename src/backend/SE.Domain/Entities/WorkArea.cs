using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    public class WorkArea : BaseEntity
    {
        public string Title { get; }
        public string TagName { get; }

        public virtual EvaluationType EvaluationType { get; }
        public virtual Role Role { get; set; }
        public virtual Role EvaluateeRole { get; set; }

        public bool IsEvaluatee { get; set; }
        public bool IsEvaluator { get; set; }

        public bool IsSchoolAdmin { get; set; }
        public bool IsDistrictAdmin { get; set; }
        public int Priority { get; set; }
    }
}
