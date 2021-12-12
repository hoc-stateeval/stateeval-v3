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

namespace SE.Services.Queries
{
    public class GetTeacherAssignmentDataForSchoolQueryValidator
    : AbstractValidator<GetTeacherAssignmentDataForSchoolQuery>
    {
        public GetTeacherAssignmentDataForSchoolQueryValidator()
        {
            RuleFor(x => x.FrameworkContextId).NotEmpty();
            RuleFor(x => x.SchoolCode).NotEmpty();
        }
    }
    public sealed class GetTeacherAssignmentDataForSchoolQuery :
        IRequest<SchoolTeacherAssignmentsSummaryDTO>
    {
        public long FrameworkContextId { get; }
        public string SchoolCode { get; }

        public GetTeacherAssignmentDataForSchoolQuery(long frameworkContextId, string schoolCode)
        {
            FrameworkContextId = frameworkContextId;
            SchoolCode = schoolCode;
        }

        internal sealed class GetTeacherAssignmentDataForSchoolQueryHandler : 
            IRequestHandler<GetTeacherAssignmentDataForSchoolQuery, SchoolTeacherAssignmentsSummaryDTO>
        {
            private readonly DataContext _dataContext;
            private readonly IUserService _userService;
            public GetTeacherAssignmentDataForSchoolQueryHandler(DataContext dataContext, IUserService userService)
            {
                _dataContext = dataContext;
                _userService = userService;
            }

            public async Task<SchoolTeacherAssignmentsSummaryDTO> Handle(GetTeacherAssignmentDataForSchoolQuery request, CancellationToken cancellationToken)
            {
                SchoolTeacherAssignmentsSummaryDTO result = new SchoolTeacherAssignmentsSummaryDTO();

                var frameworkContext = await _dataContext.FrameworkContexts
                    .Where(x => x.Id == request.FrameworkContextId)
                    .FirstOrDefaultAsync();

                result.Delegated = await _dataContext.SchoolConfigurations
                    .Where(x => x.SchoolCode == request.SchoolCode)
                    .Select(x => x.IsPrincipalAssignmentDelegated)
                    .FirstOrDefaultAsync();

                var query = _dataContext.Evaluations
                    .Include(x => x.Evaluatee)
                    .Include(x => x.Evaluator)
                    .Include(x => x.FocusedFrameworkNode)
                    .Include(x => x.FocusedSGFrameworkNode)
                    .Where(x => x.IsActive &&
                                x.SchoolYear == EnumUtils.CurrentSchoolYear &&
                                x.DistrictCode == frameworkContext.DistrictCode &&
                                x.SchoolCode == request.SchoolCode &&
                                x.EvaluationType == EvaluationType.TEACHER);

                result.TeacherEvaluationSummaries = QueryUtils.BuildEvaluationSummaryDTO(query);
                result.Principals = await _userService.GetUsersInRoleAtDistrictBuildings(frameworkContext.DistrictCode, 
                                                            EnumUtils.MapRoleTypeToDisplayName(RoleType.PR));
                result.DistrictWideTeacherEvaluators = await _userService.GetUsersInRoleAtDistrict(frameworkContext.DistrictCode, 
                                                            EnumUtils.MapRoleTypeToDisplayName(RoleType.DTE));
                return result;
                
            }
        }
    }
}
