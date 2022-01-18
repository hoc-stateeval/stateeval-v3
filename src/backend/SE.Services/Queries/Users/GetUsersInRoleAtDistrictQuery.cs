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

namespace SE.Core.Queries.Users
{
    public class GetUsersInRoleAtDistrictQueryValidator
    : AbstractValidator<GetUsersInRoleAtDistrictQuery>
    {
        public GetUsersInRoleAtDistrictQueryValidator()
        {
            RuleFor(x => x.DistrictCode).NotEmpty();
            RuleFor(x => x.RoleType).NotEmpty();
        }
    }
    public sealed class GetUsersInRoleAtDistrictQuery : 
        IRequest<IResponse<List<UserDTO>>>
    {
        public string DistrictCode { get; }
        public RoleType RoleType { get; }

        public GetUsersInRoleAtDistrictQuery(string districtCode, RoleType roleType)
        {
            DistrictCode = districtCode;
            RoleType = roleType;
        }

        internal sealed class GetUsersInRoleAtDistrictQueryHandler : 
            IRequestHandler<GetUsersInRoleAtDistrictQuery, IResponse<List<UserDTO>>>
        {
            private readonly IUserService _userService;
            public GetUsersInRoleAtDistrictQueryHandler(IUserService userService)
            {
                _userService = userService;
            }

            public async Task<IResponse<List<UserDTO>>> Handle(GetUsersInRoleAtDistrictQuery request, CancellationToken cancellationToken)
            {
                var user = await _userService.GetUsersInRoleAtDistrict(request.DistrictCode, request.RoleType);
                return Response.Success(user);
            }
        }
    }
}
