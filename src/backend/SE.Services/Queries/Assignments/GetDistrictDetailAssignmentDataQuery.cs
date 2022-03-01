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
using SE.Core.Common;
using SE.Core.Common.Exceptions;

namespace SE.Core.Queries.Assignments
{
    public class GetDistrictDetailAssignmentDataQueryValidator
    : AbstractValidator<GetDistrictDetailAssignmentDataQuery>
    {
        public GetDistrictDetailAssignmentDataQueryValidator()
        {
            RuleFor(x => x.FrameworkContextId).NotEmpty();
        }
    }
    public sealed class GetDistrictDetailAssignmentDataQuery :
        IRequest<IResponse<SchoolDetailAssignmentDataDTO>>
    {
        public long FrameworkContextId { get; }

        public GetDistrictDetailAssignmentDataQuery(long frameworkContextId)
        {
            FrameworkContextId = frameworkContextId;
        }

        internal sealed class GetDistrictDetailAssignmentDataQueryHandler : 
            IRequestHandler<GetDistrictDetailAssignmentDataQuery, IResponse<SchoolDetailAssignmentDataDTO>>
        {
            private readonly DataContext _dataContext;
            private readonly IUserService _userService;
            private readonly IEvaluationService _evaluationService;
            private readonly IBuildingService _buildingService;

            public GetDistrictDetailAssignmentDataQueryHandler(DataContext dataContext, IBuildingService building, IUserService userService, IEvaluationService evaluationService)
            {
                _dataContext = dataContext;
                _userService = userService;
                _evaluationService = evaluationService;
                _buildingService = building;
            }

            public async Task<IResponse<SchoolDetailAssignmentDataDTO>> Handle(GetDistrictDetailAssignmentDataQuery request, CancellationToken cancellationToken)
            {
                var result = new SchoolDetailAssignmentDataDTO();

                var frameworkContext = await _dataContext.FrameworkContexts
                    .Where(x => x.Id == request.FrameworkContextId)
                    .FirstOrDefaultAsync();

                if (frameworkContext == null)
                {
                    throw new NotFoundException(nameof(FrameworkContext), request.FrameworkContextId);
                }

                result.EvaluationSummaries = await _evaluationService
                    .ExecuteEvaluationSummaryDTOQuery(x => x.IsActive &&
                                x.FrameworkContextId == frameworkContext.Id)
                    .ToListAsync();

                result.Evaluatees = await _userService.GetUsersInRoleAtSchools(frameworkContext.DistrictCode, (RoleType)frameworkContext.EvaluateeRoleId);

                result.EvaluatorRoleTypes = RoleUtils.MapEvaluateeRoleTypeToEvaluatorRoleTypes(
                      (RoleType)frameworkContext.EvaluateeRole.Id, (EvaluationType)frameworkContext.EvaluationType);

                var schools = await _buildingService.GetSchoolsInDistrict(frameworkContext.DistrictCode);

                result.Evaluators = new List<UserDTO>();

                foreach (var school in schools)
                {
                    var next = RoleUtils.GetEvaluatorsBasedOnEvaluateeRoleType(_userService, frameworkContext, school.SchoolCode, result.EvaluatorRoleTypes);
                    result.Evaluators.AddRange(next);
                };

                return Response.Success(result);
            }
        }
    }
}
