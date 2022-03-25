using SE.Core.Models;
using SE.Core.Mappers;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SE.Core.Common;

namespace SE.Core.Mappers
{
    public static partial class Mapper
    {
        public static UserPromptTierConfigDTO MapToUserPromptTierConfigDTO(this UserPromptTierConfig source)
        {
            UserPromptTierConfigDTO target =new UserPromptTierConfigDTO();
            target.Id = source.Id;
            target.UserPromptId = source.UserPromptId;
            target.ConfigurationTier = source.ConfigurationTier;
            target.SchoolCode = source.SchoolCode;
            target.EvaluatorId = source.EvaluatorId;
            target.Required = source.Required;

            return target;
        }
    }
}
