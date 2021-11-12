using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class WorkAreaContextDTO
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public string TagName { get; set; }
        public string Title { get; set; }
        public string DistrictName { get; set; }
        public string SchoolName { get; set; }
        public string DistrictCode { get; set; }
        public string SchoolCode { get; set; }
        public Boolean IsSchool { get; set; }
        public string RoleName { get; set; }
        public string EvaluatorRoleName { get; set; }
        public string EvaluateeRoleName { get; set; }

        public string EvaluatorRoleNameLC { get; set; }
        public string EvaluateeRoleNameLC { get; set; }
        public int EvaluationType { get; set; }

        public long FrameworkContextId { get; set; }
        public string FrameworkContextName { get; set; }
        public long StateFrameworkId { get; set; }
        public long? InstructionalFrameworkId { get; set; }
        public long DefaultFrameworkId { get; set; }

        public bool IsEvaluatee { get; set; }
        public bool IsEvaluator { get; set; }

        public bool IsSchoolAdmin { get; set; }
        public bool IsDistrictAdmin { get; set; }

        public int Priority { get; set; }

        public string RouteParam { get; set; }
    }
  
}
