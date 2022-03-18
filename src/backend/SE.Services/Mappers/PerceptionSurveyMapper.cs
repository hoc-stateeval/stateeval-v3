using SE.Core.Common;
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
            target.Guid = source.Guid;
            target.Title = source.Title;
            target.EvaluationId = source.EvaluationId;
            target.SchoolCode = source.SchoolCode;
            target.TinyURL = source.TinyURL;

            target.WfState = (WfState)source.WfState;
            target.WfStateDisplayName = EnumUtils.MapWfStateToDisplayName((WfState)source.WfState, "");

            return target;
        }
    }
}
