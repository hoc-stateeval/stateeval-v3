using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SE.Domain.Entities;
using SE.Core.Models;

namespace SE.Core.Mappers
{
    public static partial class Mapper
    {
        public static UserBuildingRoleDTO MapToBuildingRoleDTO(this UserBuildingRole source)
        {
            UserBuildingRoleDTO target = new UserBuildingRoleDTO();
            target.Id = source.Id;
            target.UserId = source.UserId;
            target.BuildingId = source.BuildingId;
            target.RoleId = source.RoleId;
            target.RoleName = source.Role.DisplayName;
            target.DistrictCode = source.Building.DistrictCode;
            target.SchoolCode = source.Building.SchoolCode;
            target.DistrictName = source.Building.DistrictName;
            target.SchoolName = source.Building.SchoolName;

            return target;
        }

        public static UserBuildingRole MapToUserBuildingRole(this UserBuildingRoleDTO source)
        {
            UserBuildingRole target = new UserBuildingRole();
            target.Id = source.Id;
            target.UserId = source.UserId;
            target.BuildingId = source.BuildingId;
            target.RoleId = source.RoleId;

            return target;
        }
    }
}
