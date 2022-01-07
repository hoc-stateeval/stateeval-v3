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

namespace SE.Core.Queries.Assignments
{
    public class GetSchoolDetailAssignmentDataQueryValidator
    : AbstractValidator<GetSchoolDetailAssignmentDataQuery>
    {
        public GetSchoolDetailAssignmentDataQueryValidator()
        {
            RuleFor(x => x.FrameworkContextId).NotEmpty();
            RuleFor(x => x.SchoolCode).NotEmpty();
        }
    }
    public sealed class GetSchoolDetailAssignmentDataQuery :
        IRequest<IResponse<SchoolDetailAssignmentDataDTO>>
    {
        public long FrameworkContextId { get; }
        public string SchoolCode { get; }

        public GetSchoolDetailAssignmentDataQuery(long frameworkContextId, string schoolCode)
        {
            FrameworkContextId = frameworkContextId;
            SchoolCode = schoolCode;
        }

        internal sealed class GetSchoolDetailAssignmentDataQueryHandler : 
            IRequestHandler<GetSchoolDetailAssignmentDataQuery, IResponse<SchoolDetailAssignmentDataDTO>>
        {
            private readonly DataContext _dataContext;
            private readonly IUserService _userService;
            private readonly IEvaluationService _evaluationService;

            public GetSchoolDetailAssignmentDataQueryHandler(DataContext dataContext, IUserService userService, IEvaluationService evaluationService)
            {
                _dataContext = dataContext;
                _userService = userService;
                _evaluationService = evaluationService;
            }

            public async Task<IResponse<SchoolDetailAssignmentDataDTO>> Handle(GetSchoolDetailAssignmentDataQuery request, CancellationToken cancellationToken)
            {
                var result = new SchoolDetailAssignmentDataDTO();

                var frameworkContext = await _dataContext.FrameworkContexts
                    .Where(x => x.Id == request.FrameworkContextId)
                    .FirstOrDefaultAsync();

                result.EvaluationSummaries = await _evaluationService
                    .ExecuteEvaluationSummaryDTOQuery(x => x.IsActive &&
                                x.FrameworkContextId == frameworkContext.Id &&
                                x.SchoolCode == request.SchoolCode)
                    .ToListAsync();

                result.Evaluatees = await _userService.GetUsersInRoleAtSchool(request.SchoolCode, (RoleType)frameworkContext.EvaluateeRoleId);

                result.EvaluatorRoleTypes = RoleUtils.MapEvaluateeRoleTypeToEvaluatorRoleTypes(
                      (RoleType)frameworkContext.EvaluateeRole.Id, (EvaluationType)frameworkContext.EvaluationType);

                result.Evaluators = RoleUtils.GetEvaluatorsBasedOnEvaluateeRoleType(_userService, frameworkContext, request.SchoolCode, result.EvaluatorRoleTypes);

                return Response.Success(result);
            }
        }
    }
}
