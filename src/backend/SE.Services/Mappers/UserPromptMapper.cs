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
            target.Prompt = source.Prompt;
            target.PromptType = source.PromptType;
            target.OwnerTier = source.OwnerTier;
            target.ObservationId = source.ObservationId;
            target.EvaluationId = source.EvaluationId;
            target.TierConfigs = source.TierConfigs.Select(x => x.MapToUserPromptTierConfig()).ToList();

            return target;
        }
    }
}
