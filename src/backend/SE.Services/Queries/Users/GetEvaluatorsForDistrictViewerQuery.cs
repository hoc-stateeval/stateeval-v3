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
using SE.Core.Common;

namespace SE.Core.Queries.Evaluators
{
    public class GetEvaluatorsForDistrictViewerQueryValidator
    : AbstractValidator<GetEvaluatorsForDistrictViewerQuery>
    {
        public GetEvaluatorsForDistrictViewerQueryValidator()
        {
        }
    }
    public sealed class GetEvaluatorsForDistrictViewerQuery : 
        IRequest<IResponse<List<UserDTO>>>
    {
        public long WorkAreaContextId { get; }
        public string SchoolCode { get; }  

        public GetEvaluatorsForDistrictViewerQuery(long workAreaContextId, string schoolCode)
        {
            WorkAreaContextId = workAreaContextId;
            SchoolCode = schoolCode;
        }

        internal sealed class GetEvaluatorsForDistrictViewerQueryHandler : 
            IRequestHandler<GetEvaluatorsForDistrictViewerQuery, IResponse<List<UserDTO>>>
        {
            private readonly DataContext _dataContext;
            private readonly IUserService _userService;
           
            public GetEvaluatorsForDistrictViewerQueryHandler(DataContext dataContext, IUserService userService)
            {
                _dataContext = dataContext;
                _userService = userService;
            }

            public async Task<IResponse<List<UserDTO>>> Handle(GetEvaluatorsForDistrictViewerQuery request, CancellationToken cancellationToken)
            {
                
                var workAreaContext = await _dataContext.WorkAreaContexts
                    .Include(x => x.WorkArea).ThenInclude(x => x.EvaluateeRole)
                    .Where(x => x.Id == request.WorkAreaContextId)
                    .FirstOrDefaultAsync();

                if (workAreaContext.WorkArea.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DV_PR_TR)) {
                    var users = await _userService.GetUsersInRoleAtSchool(request.SchoolCode, RoleType.PR);
                    return Response.Success(users);
                }
                else if (workAreaContext.WorkArea.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DV_PR_PR)) {
                    var users = await _userService.GetUsersInRoleAtSchool(request.SchoolCode, RoleType.HEAD_PR);
                    return Response.Success(users);
                }
                else if (workAreaContext.WorkArea.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DV_DE))
                {
                    var users = await _userService.GetUsersInRoleAtDistrict(request.SchoolCode, RoleType.DE);
                    return Response.Success(users);
                }
                else if (workAreaContext.WorkArea.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DV_DTE))
                {
                    var users = await _userService.GetUsersInRoleAtDistrict(request.SchoolCode, RoleType.DTE);
                    return Response.Success(users);
                }
                else if (workAreaContext.WorkArea.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DV_CT))
                {
                    var users = await _userService.GetUsersInRoleAtSchool(request.SchoolCode, RoleType.SPS_CT_TR);
                    return Response.Success(users);
                }
                else
                {
                    throw new Exception($"GetEvaluatorsForDistrictViewerQuery: Unknown workarea: {workAreaContext.WorkArea.TagName}");
                }
            }
        }
    }
}
