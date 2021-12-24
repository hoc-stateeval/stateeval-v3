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
    public class GetTeacherAssignmentsSummaryForDistrictQueryValidator
    : AbstractValidator<GetTeacherAssignmentsSummaryForDistrictQuery>
    {
        public GetTeacherAssignmentsSummaryForDistrictQueryValidator()
        {
            RuleFor(x => x.FrameworkContextId).NotEmpty();
        }
    }
    public sealed class GetTeacherAssignmentsSummaryForDistrictQuery :
        IRequest<List<DistrictTeacherAssignmentsSummaryDTO>>
    {
        public long FrameworkContextId { get; }

        public GetTeacherAssignmentsSummaryForDistrictQuery(long frameworkContextId)
        {
            FrameworkContextId = frameworkContextId;
        }

        internal sealed class GetTeacherAssignmentsSummaryForDistrictQueryHandler : 
            IRequestHandler<GetTeacherAssignmentsSummaryForDistrictQuery, List<DistrictTeacherAssignmentsSummaryDTO>>
        {
            private readonly DataContext _dataContext;
            private readonly IBuildingService _buildingService;
            public GetTeacherAssignmentsSummaryForDistrictQueryHandler(DataContext dataContext, IBuildingService buildingService)
            {
                _dataContext = dataContext;
                _buildingService = buildingService;
            }

            public async Task<List<DistrictTeacherAssignmentsSummaryDTO>> Handle(GetTeacherAssignmentsSummaryForDistrictQuery request, CancellationToken cancellationToken)
            {
                var frameworkContext = await _dataContext.FrameworkContexts
                    .Where(x => x.Id == request.FrameworkContextId)
                    .FirstOrDefaultAsync();

                var building = await _dataContext.Buildings
                    .Where(x => !x.IsSchool && x.DistrictCode == frameworkContext.DistrictCode)
                    .FirstOrDefaultAsync();

                var summaries = new List<DistrictTeacherAssignmentsSummaryDTO>();

                var schools = await _buildingService.GetSchoolsInDistrict(frameworkContext.DistrictCode);

                schools.ForEach(async school =>
                {
                    DistrictTeacherAssignmentsSummaryDTO summary = new DistrictTeacherAssignmentsSummaryDTO();
                    summaries.Add(summary);
                    summary.SchoolCode = school.SchoolCode;
                    summary.SchoolName = school.SchoolName;

                    var teachers = _dataContext.Users
                      .Include(x => x.UserBuildingRoles).ThenInclude(x => x.Building)
                      .Include(x => x.UserBuildingRoles).ThenInclude(x => x.Role)
                      .Where(x => x.UserBuildingRoles.Any(y => y.Building.DistrictCode == building.DistrictCode && 
                                                               y.Building.SchoolCode == school.SchoolCode) &&
                                  x.UserBuildingRoles.Any(y => y.Role.DisplayName == EnumUtils.MapRoleTypeToDisplayName(RoleType.TR)))
                      .ToList();

                    summary.TotalCount = teachers.Count;

                    var principals = _dataContext.Users
                      .Include(x => x.UserBuildingRoles).ThenInclude(x => x.Building)
                      .Include(x => x.UserBuildingRoles).ThenInclude(x => x.Role)
                      .Where(x => x.UserBuildingRoles.Any(y => y.Building.DistrictCode == building.DistrictCode &&
                                                               y.Building.SchoolCode == school.SchoolCode) &&
                                  x.UserBuildingRoles.Any(y => y.Role.DisplayName == EnumUtils.MapRoleTypeToDisplayName(RoleType.PR) ||
                                                               y.Role.DisplayName == EnumUtils.MapRoleTypeToDisplayName(RoleType.HEAD_PR)))
                      .ToList();

                    summary.PrincipalNames = principals.Select(x => x.FirstName + " " + x.LastName).ToList();
                    summary.PrincipalNames.Sort();

                    var evaluations = _dataContext.Evaluations
                        .Where(x => x.IsActive &&
                                x.SchoolYear == EnumUtils.CurrentSchoolYear &&
                                x.DistrictCode == frameworkContext.DistrictCode &&
                                x.SchoolCode == school.SchoolCode &&
                                x.EvaluationType == frameworkContext.EvaluationType)
                        .ToList();

                    summary.UnassignedCount = 0;
                    evaluations.ForEach(evaluation =>
                    {
                        var user = teachers.FirstOrDefault(x => x.Id == evaluation.EvaluateeId);
                        if (user != null && (evaluation.EvaluatorId == null || evaluation.EvaluateePlanType == null))
                        {
                            summary.UnassignedCount++;
                        }
                    });

                    summary.AssignedCount = summary.TotalCount - summary.UnassignedCount;

                    summary.Delegated = _dataContext.SchoolConfigurations
                        .FirstOrDefault(x => x.SchoolCode == school.SchoolCode &&
                                           x.FrameworkContextId == frameworkContext.Id).IsPrincipalAssignmentDelegated;
                });

                return summaries;
            }
        }
    }
}
