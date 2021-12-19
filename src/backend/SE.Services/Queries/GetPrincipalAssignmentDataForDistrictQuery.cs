using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SE.Data;
using SE.Domain.Entities;
using SE.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SE.Core.Queries;
using SE.Core.Services;
using SE.Core.Mappers;

namespace SE.Services.Queries
{
    public class GetPrincipalAssignmentDataForDistrictQueryValidator
    : AbstractValidator<GetPrincipalAssignmentDataForDistrictQuery>
    {
        public GetPrincipalAssignmentDataForDistrictQueryValidator()
        {
            RuleFor(x => x.FrameworkContextId).NotEmpty();
        }
    }
    public sealed class GetPrincipalAssignmentDataForDistrictQuery :
        IRequest<DistrictPrincipalAssignmentsSummaryDTO>
    {
        public long FrameworkContextId { get; }
        public string SchoolCode { get; }

        public GetPrincipalAssignmentDataForDistrictQuery(long frameworkContextId, string schoolCode)
        {
            FrameworkContextId = frameworkContextId;
            SchoolCode = schoolCode;
        }

        internal sealed class GetPrincipalAssignmentDataForDistrictQueryHandler : 
            IRequestHandler<GetPrincipalAssignmentDataForDistrictQuery, DistrictPrincipalAssignmentsSummaryDTO>
        {
            private readonly DataContext _dataContext;
            private readonly IUserService _userService;
            private readonly IEvaluationService _evaluationService;

            public GetPrincipalAssignmentDataForDistrictQueryHandler(DataContext dataContext, IUserService userService, IEvaluationService evaluationService)
            {
                _dataContext = dataContext;
                _userService = userService;
                _evaluationService = evaluationService;
            }

            public async Task<DistrictPrincipalAssignmentsSummaryDTO> Handle(GetPrincipalAssignmentDataForDistrictQuery request, CancellationToken cancellationToken)
            {
                DistrictPrincipalAssignmentsSummaryDTO result = new DistrictPrincipalAssignmentsSummaryDTO();

                var frameworkContext = await _dataContext.FrameworkContexts
                    .Where(x => x.Id == request.FrameworkContextId)
                    .FirstOrDefaultAsync();

                result.EvaluationSummaries = await _evaluationService
                    .ExecuteEvaluationSummaryDTOQuery(x => x.IsActive &&
                                x.SchoolYear == EnumUtils.CurrentSchoolYear &&
                                x.DistrictCode == frameworkContext.DistrictCode &&
                                x.EvaluationType == EvaluationType.PRINCIPAL)
                    .ToListAsync();

                if (String.IsNullOrEmpty(request.SchoolCode))
                {
                    result.Evaluatees = await _userService.GetUsersInRoleAtDistrictBuildings(frameworkContext.DistrictCode,
                            EnumUtils.MapRoleTypeToDisplayName(RoleType.PR));
                }
                else {
                    // only include principals and EvaluationSummaries for the principals at the school
                    result.Evaluatees = await _userService.GetUsersInRoleAtSchool(request.SchoolCode,
                            EnumUtils.MapRoleTypeToDisplayName(RoleType.PR));
                    result.EvaluationSummaries = result.EvaluationSummaries.Where(x => result.Evaluatees.Any(y => y.Id == x.EvaluateeId)).ToList();
                }

                result.HeadPrincipals = await _userService.GetUsersInRoleAtDistrictBuildings(frameworkContext.DistrictCode, 
                                                            EnumUtils.MapRoleTypeToDisplayName(RoleType.HEAD_PR));

                // only include head principals that aren't also in the evaluatee list so that a head principal cannot
                // assign themselves as their evaluator.
                result.HeadPrincipals = result.HeadPrincipals.Where(x => result.Evaluatees.Any(y => y.Id != x.Id)).ToList();

                result.DistrictEvaluators = await _userService.GetUsersInRoleAtDistrict(frameworkContext.DistrictCode, 
                                                            EnumUtils.MapRoleTypeToDisplayName(RoleType.DE));
                return result;
                
            }
        }
    }
}
