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
        public static BuildingDTO MapToBuildingDTO(this Building source, BuildingDTO? target = null)
        {
            target = target ?? new BuildingDTO();
            target.Id = source.Id;
            target.IsSchool = source.IsSchool;
            target.DistrictCode = source.DistrictCode;
            target.DistrictName = source.DistrictName;
            target.SchoolCode = source.SchoolCode;
            target.SchoolName = source.SchoolName;

            return target;
        }
    }
}
