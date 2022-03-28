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
        public static UserPromptDTO MapToUserPromptDTO(this UserPrompt source)
        {
            UserPromptDTO target =new UserPromptDTO();
            target.Id = source.Id;
            target.OwnerTier = source.OwnerTier;
            target.OwnerTierDisplayName = EnumUtils.UserPromptOwnerTierDisplayName(source.OwnerTier);
            target.SchoolCode = source.SchoolCode;
            target.EvaluatorId = source.EvaluatorId;

            target.DistrictDefinedOnly = source.DistrictDefinedOnly;

            target.Prompt = source.Prompt;
            target.PromptType = source.PromptType;
            target.ObservationId = source.ObservationId;
            target.EvaluationId = source.EvaluationId;
            target.TierConfigs = source.TierConfigs.Select(x => x.MapToUserPromptTierConfigDTO()).ToList();

            target.RequiredByTier = UserPromptTier.UNDEFINED;
            target.RequiredByTierDisplayName = "";
            var config = source.TierConfigs.Find(x => x.Required);
            if (config != null)
            {
                target.RequiredByTier = config.ConfigurationTier;
                target.RequiredByTierDisplayName = EnumUtils.UserPromptOwnerTierDisplayName(target.RequiredByTier);
            }

            return target;
        }
    }
}
