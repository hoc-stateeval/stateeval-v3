using SE.Core.Models;
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
        public static PerceptionSurveyDemographicDTO MapToPerceptionSurveyDemographicDTO(this PerceptionSurveyDemographic source)
        {
            PerceptionSurveyDemographicDTO target = new PerceptionSurveyDemographicDTO();
            target.SurveyId = source.Id;
            target.SurveyId = source.SurveyId;
            target.Ethnitcities = source.Ethnicities;
            target.Gender = source.Gender;
            return target;
        }
    }
}
