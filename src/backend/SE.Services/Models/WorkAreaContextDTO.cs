using SE.Domain.Entities;
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
        public RoleType RoleType { get; set; }
        public string RoleName { get; set; }
        public RoleType EvaluateeRoleType { get;set; }
        public string EvaluateeRoleName { get; set; }
        public string EvaluatorTerm { get; set; }
        public string EvaluateeTerm { get; set; }

        public string EvaluatorTermLC { get; set; }
        public string EvaluateeTermLC { get; set; }
        public EvaluationType EvaluationType { get; set; }

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
    }
  
}
