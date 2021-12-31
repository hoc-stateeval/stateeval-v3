using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class UserDTO
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string ProfileImageUrl { get; set; }

        public List<UserBuildingRoleDTO> UserBuildingRoles { get; set; }
    }
}
