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
    public class GetEvaluationSetupDataQueryValidator
    : AbstractValidator<GetEvaluationSetupDataQuery>
    {
        public GetEvaluationSetupDataQueryValidator()
        {
        }
    }
    public sealed class GetEvaluationSetupDataQuery :
        IRequest<EvaluationSetupDataDTO>
    {
        public long FrameworkContextId { get; }
        public RoleType EvaluateeRoleType { get; }
        public List<RoleType> EvaluatorRoleTypes { get; }
        public string SchoolCode { get; }
        public GetEvaluationSetupDataQuery(long frameworkContextId, RoleType evaluateeRoleType, string evaluatorRoleTypes, string schoolCode)
        {
            FrameworkContextId = frameworkContextId;
            EvaluateeRoleType = evaluateeRoleType;
            SchoolCode = schoolCode;
            EvaluatorRoleTypes = new List<RoleType>();
            var roleTypesArray = evaluatorRoleTypes.Split(',');
            List<RoleType> roleTypes = roleTypesArray.Select(x => (RoleType)Convert.ToInt32(x)).ToList();
            EvaluatorRoleTypes.AddRange(roleTypes);
        }

        internal sealed class GetEvaluationSetupDataQueryHandler : 
            IRequestHandler<GetEvaluationSetupDataQuery, EvaluationSetupDataDTO>
        {
            private readonly DataContext _dataContext;
            private readonly IUserService _userService;
            private readonly IEvaluationService _evaluationService;

            public GetEvaluationSetupDataQueryHandler(DataContext dataContext, IUserService userService, IEvaluationService evaluationService)
            {
                _dataContext = dataContext;
                _userService = userService;
                _evaluationService = evaluationService;
            }

            public async Task<EvaluationSetupDataDTO> Handle(GetEvaluationSetupDataQuery request, CancellationToken cancellationToken)
            {
                EvaluationSetupDataDTO result = new EvaluationSetupDataDTO();

                var frameworkContext = await _dataContext.FrameworkContexts
                    .Where(x => x.Id == request.FrameworkContextId)
                    .FirstOrDefaultAsync();

                result.EvaluationSummaries = await _evaluationService
                    .ExecuteEvaluationSummaryDTOQuery(x => x.IsActive &&
                                x.FrameworkContextId == frameworkContext.Id &&
                                (String.IsNullOrEmpty(x.SchoolCode) || x.SchoolCode == request.SchoolCode))
                    .ToListAsync();

                result.Evaluatees = await _userService.GetUsersInRoleAtSchool(request.SchoolCode, request.EvaluateeRoleType);

                result.Evaluators = await _userService.GetUsersInRoleAtSchools(frameworkContext.DistrictCode,RoleType.PR);

                return result;
                
            }
        }
    }
}
