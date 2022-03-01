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
        public static PerceptionSurveyDTO MapToPerceptionSurveyDTO(this PerceptionSurvey source)
        {
            PerceptionSurveyDTO target = new PerceptionSurveyDTO();
            target.Id = source.Id;
            target.Title = source.Title;
            target.EvaluationId = source.EvaluationId;
            target.SchoolCode = source.SchoolCode;

            target.Statements = source.PerceptionSurveyPerceptionSurveyStatements.Select(x => x.MapToPerceptionSurveyStatementDTO()).ToList();


            return target;
        }
    }
}
