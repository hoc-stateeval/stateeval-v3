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

        public GetPrincipalAssignmentDataForDistrictQuery(long frameworkContextId)
        {
            FrameworkContextId = frameworkContextId;
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

                result.Evaluatees = await _userService.GetUsersInRoleAtDistrictBuildings(frameworkContext.DistrictCode,
                                            EnumUtils.MapRoleTypeToDisplayName(RoleType.PR));

                result.HeadPrincipals = await _userService.GetUsersInRoleAtDistrictBuildings(frameworkContext.DistrictCode, 
                                                            EnumUtils.MapRoleTypeToDisplayName(RoleType.HEAD_PR));

                result.DistrictEvaluators = await _userService.GetUsersInRoleAtDistrict(frameworkContext.DistrictCode, 
                                                            EnumUtils.MapRoleTypeToDisplayName(RoleType.DE));
                return result;
                
            }
        }
    }
}
