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
        public static ObservationDTO MapToObservationDTO(this Observation source)
        {
            ObservationDTO target =new ObservationDTO();
            target.Id = source.Id;
            target.ShortName = source.ShortName;
            target.Title = source.Title;
            target.EvaluationId = source.EvaluationId;
            target.EvaluateePlanType = source.EvaluateePlanType;
            target.CreationDateTime = source.CreationDateTime;

            return target;
        }
    }
}
