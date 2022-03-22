using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    /// <summary>
    /// An eval user can be associated with multiple roles at diffent locations
    /// </summary>
    public class UserBuildingRoleDTO
    {
        /// <summary>
        /// The id of the user building role
        /// </summary>
        public long Id { get; set; }
        /// <summary>
        /// The user id associated with the user building role
        /// </summary>
        public long UserId { get; set; }
        /// <summary>
        /// The building id associated with the user building role
        /// </summary>
        public long BuildingId { get; set; }
        /// <summary>
        /// The role id associated with the user building role
        /// </summary>
        public long RoleId { get; set; }
        /// <summary>
        /// The name of the role associated with the suer building role.
        /// </summary>
        public string RoleName { get; set; } = string.Empty;
        /// <summary>
        /// The name of the school associated with the user building role. It will be empty if the role is
        /// associated with a district building.
        /// </summary>
        public string SchoolName { get; set; } = string.Empty;
        /// <summary>
        /// The OSPI code for the school associated with the user building role.It will be empty if the role
        /// is associated with a district  building.
        /// </summary>
        public string SchoolCode { get; set; } = string.Empty;
        /// <summary>
        /// The name of the district associated with the user building role.
        /// </summary>
        public string DistrictName { get; set; } = string.Empty;
        /// <summary>
        /// The OSPI code for the district associated with the user building role.
        /// </summary>
        public string DistrictCode { get; set; } = string.Empty;

    }
}
