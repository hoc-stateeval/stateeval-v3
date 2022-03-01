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
        public static PerceptionSurveyStatementDTO MapToPerceptionSurveyStatementDTO(this PerceptionSurveyPerceptionSurveyStatement source)
        {
            PerceptionSurveyStatementDTO target = new PerceptionSurveyStatementDTO();
            target.Id = source.PerceptionSurveyStatement.Id;
            target.FrameworkTagName = source.PerceptionSurveyStatement.FrameworkTagName;
            target.Text = source.PerceptionSurveyStatement.Text;
            target.RubricRowId = source.PerceptionSurveyStatement.RubricRowId;

            return target;
        }
    }
}
