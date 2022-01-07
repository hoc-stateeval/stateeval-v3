using SE.Core.Common.Extensions;
using SE.Core.Models;
using SE.Core.Services;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Common
{
    public static class RoleUtils
    {
        public static bool IsDistrictRole(RoleType roleType)
        {
            switch (roleType)
            {
                case RoleType.TR:
                case RoleType.PR:
                case RoleType.HEAD_PR:
                case RoleType.SA:
                    return false;
                default:
                    return true;
            }
        }
        public static List<RoleType> MapEvaluateeRoleTypeToEvaluatorRoleTypes(RoleType evaluateeRoleType, EvaluationType evalType)
        {
            if (evaluateeRoleType == RoleType.TR)
            {
                return evalType == EvaluationType.TEACHER ?
                    new List<RoleType>() { RoleType.PR, RoleType.DTE } :
                    new List<RoleType>() { RoleType.SPS_CT_TR };
            }
            else if (evaluateeRoleType == RoleType.PR)
            {
                return new List<RoleType>() { RoleType.HEAD_PR, RoleType.DE };
            }

            throw new NotImplementedException($"MapEvaluateeRoleTypeToEvaluatorRoleTypes: Unknown evaluateeRoleType: {evaluateeRoleType}");
        }

        public static List<UserDTO> GetEvaluatorsBasedOnEvaluateeRoleType(IUserService userService, FrameworkContext frameworkContext, string schoolCode, List<RoleType> evaluatorRoleTypes)
        {
            var evaluators = new List<UserDTO>();

            Task.Run(async () =>
            {
                await evaluatorRoleTypes.ForEachAsync(1, async roleType =>
                {
                    if (RoleUtils.IsDistrictRole(roleType))
                    {
                        var next = await userService.GetUsersInRoleAtDistrict(frameworkContext.DistrictCode, roleType);
                        evaluators.AddRange(next);
                    }
                    else
                    {
                        var next = await userService.GetUsersInRoleAtSchool(schoolCode, roleType);
                        evaluators.AddRange(next);
                    }
                });
            }).Wait();

            return evaluators;
        }
    }
}
