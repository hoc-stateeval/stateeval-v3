using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;
using MediatR;
using SE.Data;
using SE.Domain.Entities;
using SE.Core.Models;
using Microsoft.EntityFrameworkCore;
using SE.Core.Services;
using SE.Core.Utils;

namespace SE.Core.Queries
{
    public class GetEvaluatorsForDistrictViewerQueryValidator
    : AbstractValidator<GetEvaluatorsForDistrictViewerQuery>
    {
        public GetEvaluatorsForDistrictViewerQueryValidator()
        {
        }
    }
    public sealed class GetEvaluatorsForDistrictViewerQuery : 
        IRequest<List<UserDTO>>
    {
        public long WorkAreaContextId { get; }
        public string SchoolCode { get; }  

        public GetEvaluatorsForDistrictViewerQuery(long workAreaContextId, string schoolCode)
        {
            WorkAreaContextId = workAreaContextId;
            SchoolCode = schoolCode;
        }

        internal sealed class GetEvaluatorsForDistrictViewerQueryHandler : 
            IRequestHandler<GetEvaluatorsForDistrictViewerQuery, List<UserDTO>>
        {
            private readonly DataContext _dataContext;
            private readonly IUserService _userService;
           
            public GetEvaluatorsForDistrictViewerQueryHandler(DataContext dataContext, IUserService userService)
            {
                _dataContext = dataContext;
                _userService = userService;
            }

            public async Task<List<UserDTO>> Handle(GetEvaluatorsForDistrictViewerQuery request, CancellationToken cancellationToken)
            {
                
                var workAreaContext = await _dataContext.WorkAreaContexts
                    .Include(x => x.WorkArea).ThenInclude(x => x.EvaluateeRole)
                    .Where(x => x.Id == request.WorkAreaContextId)
                    .FirstOrDefaultAsync();

                if (workAreaContext.WorkArea.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DV_PR_TR)) {
                    return await _userService.GetUsersInRoleAtSchool(request.SchoolCode, RoleType.PR);
                }
                else if (workAreaContext.WorkArea.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DV_PR_PR)) {
                    return await _userService.GetUsersInRoleAtSchool(request.SchoolCode, RoleType.HEAD_PR);
                }
                else if (workAreaContext.WorkArea.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DV_DE))
                {
                    return await _userService.GetUsersInRoleAtSchools(request.SchoolCode, RoleType.DE);
                }
                else if (workAreaContext.WorkArea.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DV_DTE))
                {
                    return await _userService.GetUsersInRoleAtSchool(request.SchoolCode, RoleType.DTE);
                }
                else if (workAreaContext.WorkArea.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DV_CT))
                {
                    return await _userService.GetUsersInRoleAtSchool(request.SchoolCode, RoleType.SPS_CT_TR);
                }
                else
                {
                    throw new Exception($"GetEvaluatorsForDistrictViewerQuery: Unknown workarea: {workAreaContext.WorkArea.TagName}");
                }
            }
        }
    }
}
