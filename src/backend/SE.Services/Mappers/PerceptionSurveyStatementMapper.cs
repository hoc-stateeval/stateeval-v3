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
        public static PerceptionSurveyStatementDTO MapToPerceptionSurveyStatementDTO(this PerceptionSurveyStatement source)
        {
            PerceptionSurveyStatementDTO target = new PerceptionSurveyStatementDTO();
            target.Id = source.Id;
            target.FrameworkTagName = source.FrameworkTagName;
            target.Text = source.Text;
            target.RubricRowId = source.RubricRowId;

            return target;
        }
    }
}
