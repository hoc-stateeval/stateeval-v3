using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    /// <summary>
    /// A user within the eval application
    /// </summary>
    public class UserDTO
    {
        /// <summary>
        /// The user id
        /// </summary>
        public long Id { get; set; }
        /// <summary>
        /// The user's first name
        /// </summary>
        public string FirstName { get; set; } = "";
        /// <summary>
        /// The user's last name
        /// </summary>
        public string LastName { get; set; } = "";
        /// <summary>
        /// The user's full name in form of FirstName LastName
        /// </summary>
        public string DisplayName { get; set; } = "";
        /// <summary>
        /// The user's email addresss
        /// </summary>
        public string Email { get; set; } = "";
        /// <summary>
        /// The user's username
        /// </summary>
        public string UserName { get; set; } = "";
        /// <summary>
        /// The use's profile image URL
        /// </summary>
        public string ProfileImageUrl { get; set; } = "";

        /// <summary>
        /// A collection of the user's building/roles
        /// </summary>
        public List<UserBuildingRoleDTO> UserBuildingRoles { get; set; } = new List<UserBuildingRoleDTO>();
    }
}
