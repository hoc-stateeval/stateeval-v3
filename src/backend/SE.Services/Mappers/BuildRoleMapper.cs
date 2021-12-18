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
        public static BuildingRoleDTO MapToBuildingRoleDTO(this UserBuildingRole source, BuildingRoleDTO? target = null)
        {
            target = target ?? new BuildingRoleDTO();
            target.RoleName = source.Role.DisplayName;
            target.DistrictCode = source.Building.DistrictCode;
            target.SchoolCode = source.Building.SchoolCode;
            target.DistrictName = source.Building.DistrictName;
            target.SchoolName = source.Building.SchoolName;

            return target;
        }
    }
}
