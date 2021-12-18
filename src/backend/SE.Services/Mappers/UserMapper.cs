using SE.Core.Models;
using SE.Core.Mappers;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Mappers
{
    public static partial class Mapper
    {
        public static UserDTO MapToUserDTO(this User source, UserDTO? target = null)
        {
            target = target ?? new UserDTO();
            target.Id = source.Id;
            target.UserName = source.UserName;
            target.FirstName = source.FirstName;
            target.LastName = source.LastName;
            target.DisplayName = target.FirstName + " " + target.LastName;
            target.Email = source.EmailAddress;
            target.ProfileImageUrl = source.ProfileImageUrl;

            target.BuildingRoles = source.UserBuildingRoles.Select(x => x.MapToBuildingRoleDTO()).ToList();

            return target;
        }
    }
}
