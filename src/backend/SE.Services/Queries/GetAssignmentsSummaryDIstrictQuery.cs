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

namespace SE.Services.Queries
{
    public class GetAssignmentsSummaryForDistrictQueryValidator
    : AbstractValidator<GetAssignmentsSummaryForDistrictQuery>
    {
        public GetAssignmentsSummaryForDistrictQueryValidator()
        {
            RuleFor(x => x.FrameworkContextId).NotEmpty();
        }
    }
    public sealed class GetAssignmentsSummaryForDistrictQuery :
        IRequest<List<SchoolAssignmentsSummaryDTO>>
    {
        public long FrameworkContextId { get; }

        public GetAssignmentsSummaryForDistrictQuery(long frameworkContextId)
        {
            FrameworkContextId = frameworkContextId;
        }

        internal sealed class GetAssignmentsSummaryForDistrictQueryHandler : 
            IRequestHandler<GetAssignmentsSummaryForDistrictQuery, List<SchoolAssignmentsSummaryDTO>>
        {
            private readonly DataContext _dataContext;
            public GetAssignmentsSummaryForDistrictQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<List<SchoolAssignmentsSummaryDTO>> Handle(GetAssignmentsSummaryForDistrictQuery request, CancellationToken cancellationToken)
            {
                var frameworkContext = await _dataContext.FrameworkContexts
                    .Where(x => x.Id == request.FrameworkContextId)
                    .FirstOrDefaultAsync();

                var building = await _dataContext.Buildings
                    .Where(x => !x.IsSchool && x.DistrictCode == frameworkContext.DistrictCode)
                    .FirstOrDefaultAsync();

                var summaries = new List<SchoolAssignmentsSummaryDTO>();

                var schools = await _dataContext.Buildings
                    .Where(x => x.IsSchool && x.DistrictCode == frameworkContext.DistrictCode)
                    .ToListAsync();

                schools.ForEach(async school =>
                {
                    SchoolAssignmentsSummaryDTO summary = new SchoolAssignmentsSummaryDTO();
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


                    summary.Delegated = _dataContext.SchoolConfigurations
                        .FirstOrDefault(x => x.SchoolCode == school.SchoolCode &&
                                           x.FrameworkContextId == frameworkContext.Id).IsPrincipalAssignmentDelegated;
                });

                return summaries;
            }
        }
    }
}
