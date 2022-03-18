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
        public static ObservationDTO MapToObservationDTO(this Observation source)
        {
            ObservationDTO target =new ObservationDTO();
            target.Id = source.Id;
            target.ShortName = source.ShortName;
            target.Title = source.Title;
            target.EvaluationId = source.EvaluationId;
            target.EvaluatorId = source.EvaluatorId;
            target.EvaluatorDisplayName = source.Evaluator.FirstName + " " + source.Evaluator.LastName;
            target.EvaluateeDisplayName = source.Evaluation.Evaluatee.FirstName + " " + source.Evaluation.Evaluatee.LastName;

            target.EvaluateePlanType = source.EvaluateePlanType;
            target.CreationDateTime = source.CreationDateTime;

            target.WfState = source.WfState;
            target.WfStateDisplayName = EnumUtils.MapWfStateToDisplayName(source.WfState, "");

            target.ObservationType = source.ObservationType;
            target.ObservationTypeDisplayName = EnumUtils.MapObservationTypeToDisplayName(source.ObservationType);

            target.PreConferenceDateTime = source.PreConferenceDateTime;
            target.ObservationDateTime = source.ObservationDateTime;
            target.PostConferenceDateTime = source.PostConferenceDateTime;
            target.ObservationDuration = source.ObservationDuration;
            target.IncludeStudentGrowthComponents = source.IncludeStudentGrowthComponents;

            return target;
        }
    }
}
