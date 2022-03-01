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
using SE.Core.Common;
using SE.Core.Common.Extensions;
using SE.Core.Common.Exceptions;

namespace SE.Core.Queries.Assignments
{
    public class GetDistrictSummaryAssignmentDataQueryValidator
    : AbstractValidator<GetDistrictSummaryAssignmentDataQuery>
    {
        public GetDistrictSummaryAssignmentDataQueryValidator()
        {
            RuleFor(x => x.FrameworkContextId).NotEmpty();
        }
    }
    public sealed class GetDistrictSummaryAssignmentDataQuery :
        IRequest<IResponse<List<SchoolSummaryAssignmentDataDTO>>>
    {
        public long FrameworkContextId { get; }

        public GetDistrictSummaryAssignmentDataQuery(long frameworkContextId)
        {
            FrameworkContextId = frameworkContextId;
        }

        internal sealed class GetDistrictSummaryAssignmentDataQueryHandler : 
            IRequestHandler<GetDistrictSummaryAssignmentDataQuery, IResponse<List<SchoolSummaryAssignmentDataDTO>>>
        {
            private readonly DataContext _dataContext;
            private readonly IBuildingService _buildingService;
            private readonly IUserService _userService;
            public GetDistrictSummaryAssignmentDataQueryHandler(DataContext dataContext, IBuildingService buildingService, IUserService userService)
            {
                _dataContext = dataContext;
                _buildingService = buildingService;
                _userService = userService;
            }

            public async Task<IResponse<List<SchoolSummaryAssignmentDataDTO>>> Handle(GetDistrictSummaryAssignmentDataQuery request, CancellationToken cancellationToken)
            {
                var frameworkContext = await _dataContext.FrameworkContexts
                    .Where(x => x.Id == request.FrameworkContextId)
                    .FirstOrDefaultAsync();

                if (frameworkContext == null)
                {
                    throw new NotFoundException(nameof(FrameworkContext), request.FrameworkContextId);
                }

                var schoolSummaries = new List<SchoolSummaryAssignmentDataDTO>();

                var schools = await _buildingService.GetSchoolsInDistrict(frameworkContext.DistrictCode);

                Task.Run(async () =>
                {
                    await schools.ForEachAsync(1, async school =>
                    {
                        SchoolSummaryAssignmentDataDTO schoolSummary = new SchoolSummaryAssignmentDataDTO();
                        schoolSummaries.Add(schoolSummary);
                        schoolSummary.SchoolCode = school.SchoolCode;
                        schoolSummary.SchoolName = school.SchoolName;

                        var evaluatees = await _userService.GetUsersInRoleAtSchool(school.SchoolCode, (RoleType)frameworkContext.EvaluateeRoleId);

                        schoolSummary.EvaluatorRoleTypes = RoleUtils.MapEvaluateeRoleTypeToEvaluatorRoleTypes(
                                            (RoleType)frameworkContext.EvaluateeRole.Id, (EvaluationType)frameworkContext.EvaluationType);

                        schoolSummary.Evaluators = RoleUtils.GetEvaluatorsBasedOnEvaluateeRoleType(_userService, frameworkContext, school.SchoolCode, schoolSummary.EvaluatorRoleTypes);

                        var evaluations = _dataContext.Evaluations
                            .Where(x => x.IsActive &&
                                    x.FrameworkContextId == frameworkContext.Id &&
                                    x.SchoolCode == school.SchoolCode)
                            .ToList();

                        schoolSummary.TotalCount = evaluatees.Count;
                        schoolSummary.UnassignedCount = evaluations.Select(x => x.EvaluatorId == null || x.EvaluateePlanType == null).ToList().Count();
                        schoolSummary.AssignedCount = schoolSummary.TotalCount - schoolSummary.UnassignedCount;

                    });
                }).Wait();

                return Response.Success(schoolSummaries);
            }
        }
    }
}
