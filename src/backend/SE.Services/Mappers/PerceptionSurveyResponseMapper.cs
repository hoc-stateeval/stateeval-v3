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
        public static PerceptionSurveyResponseDTO MapToPerceptionSurveyResponseDTO(this PerceptionSurveyResponse source)
        {
            PerceptionSurveyResponseDTO target = new PerceptionSurveyResponseDTO();
            target.Id = source.Id;
            target.SurveyId = source.PerceptionSurveyId;
            target.StatementId = source.PerceptionSurveyStatementId;
            target.LevelOfAgreement = source.LevelOfAgreement;
            target.RespondentId = source.RespondentId;

            return target;
        }
    }
}
