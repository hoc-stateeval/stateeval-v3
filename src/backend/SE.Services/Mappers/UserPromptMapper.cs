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
            target.Retired = source.Retired;
            target.PromptType = source.PromptType;
            target.EvaluatorRequired = source.EvaluatorRequired;
            target.DistrictRequired = source.DistrictRequired;
            target.SchoolRequired = source.SchoolRequired;
            target.OwnerTier = source.OwnerTier;
            target.ObservationId = source.ObservationId;
            target.EvaluationId = source.EvaluationId;

            return target;
        }
    }
}
