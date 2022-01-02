using SE.Core.Models;
using SE.Core.Mappers;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SE.Core.Utils;

namespace SE.Core.Mappers
{
    public static partial class Mapper
    {
        public static WorkAreaContextDTO MapToWorkAreaContextDTO(this WorkAreaContext source)
        {
            WorkAreaContextDTO target =new WorkAreaContextDTO();
            target.Id = source.Id;
            target.UserId = source.User.Id;
            target.TagName = source.WorkArea.TagName;
            target.Title = source.WorkArea.Title;
            target.RoleName = source.WorkArea.Role.DisplayName;
            target.RoleType = (RoleType)source.WorkArea.Role.Id;
            target.EvaluateeRoleName = source.WorkArea.EvaluateeRole.DisplayName;
            target.EvaluateeRoleType = (RoleType)source.WorkArea.EvaluateeRole.Id;
            target.EvaluatorTerm = EnumUtils.MapEvaluationTypeToEvaluatorTerm(source.WorkArea.EvaluationType);
            target.EvaluatorTermLC = StringExtensions.FirstCharacterToLower(EnumUtils.MapEvaluationTypeToEvaluatorTerm(source.WorkArea.EvaluationType));
            target.EvaluateeTerm = EnumUtils.MapEvaluationTypeToEvaluateeTerm(source.WorkArea.EvaluationType);
            target.EvaluateeTermLC = StringExtensions.FirstCharacterToLower(EnumUtils.MapEvaluationTypeToEvaluateeTerm(source.WorkArea.EvaluationType));
            target.IsSchool = source.Building.IsSchool;
            target.DistrictName = source.Building.DistrictName;
            target.DistrictCode = source.Building.DistrictCode;
            target.SchoolName = source.Building.SchoolName;
            target.SchoolCode = source.Building.SchoolCode;
            target.EvaluationType = source.WorkArea.EvaluationType;
            target.Priority = source.WorkArea.Priority;
            target.FrameworkContextId = source.FrameworkContext.Id;
            target.FrameworkContextName = source.FrameworkContext.Name;
            target.StateFrameworkId = source.FrameworkContext.StateFrameworkId;
            target.InstructionalFrameworkId = source.FrameworkContext.InstructionalFrameworkId;
            target.DefaultFrameworkId = source.FrameworkContext.DefaultFrameworkId;
            target.IsDistrictAdmin = Convert.ToBoolean(source.WorkArea.IsDistrictAdmin);
            target.IsSchoolAdmin = Convert.ToBoolean(source.WorkArea.IsSchoolAdmin);
            target.IsEvaluator = Convert.ToBoolean(source.WorkArea.IsEvaluator);
            target.IsEvaluatee = Convert.ToBoolean(source.WorkArea.IsEvaluatee);

            return target;
        }
    }
}
