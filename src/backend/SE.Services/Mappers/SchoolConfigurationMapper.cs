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
        public static SchoolConfigurationDTO MapToSchoolConfigurationDTO(this SchoolConfiguration source)
        {
            SchoolConfigurationDTO target = new SchoolConfigurationDTO();

            target.Id = source.Id;
            target.FrameworkContextId = source.FrameworkContextId;
            target.EvaluationSetupDelegated = source.EvaluationSetupDelegated;
            target.SchoolCode = source.SchoolCode;

            return target;
        }
    }
}
