using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class UserBuildingRoleDTO
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public long BuildingId { get; set; }
        public long RoleId { get; set; }
        public string SchoolName { get; set; } = string.Empty;
        public string SchoolCode { get; set; } = string.Empty;
        public string DistrictName { get; set; } = string.Empty;
        public string DistrictCode { get; set; } = string.Empty;
        public string RoleName { get; set; } = string.Empty;
    }
}
