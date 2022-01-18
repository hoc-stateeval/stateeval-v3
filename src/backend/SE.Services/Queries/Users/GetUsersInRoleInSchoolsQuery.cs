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
    public class GetUsersInRoleInSchoolsQueryValidator
    : AbstractValidator<GetUsersInRoleInSchoolsQuery>
    {
        public GetUsersInRoleInSchoolsQueryValidator()
        {
            RuleFor(x => x.DistrictCode).NotEmpty();
            RuleFor(x => x.RoleType).NotEmpty();
        }
    }
    public sealed class GetUsersInRoleInSchoolsQuery : 
        IRequest<IResponse<List<UserDTO>>>
    {
        public string DistrictCode { get; }
        public RoleType RoleType { get; }

        public GetUsersInRoleInSchoolsQuery(string districtCode, RoleType roleType)
        {
            DistrictCode = districtCode;
            RoleType = roleType;
        }

        internal sealed class GetUsersInRoleInSchoolsQueryHandler : 
            IRequestHandler<GetUsersInRoleInSchoolsQuery, IResponse<List<UserDTO>>>
        {
            private readonly IUserService _userService;
            public GetUsersInRoleInSchoolsQueryHandler(IUserService userService)
            {
                _userService = userService;
            }

            public async Task<IResponse<List<UserDTO>>> Handle(GetUsersInRoleInSchoolsQuery request, CancellationToken cancellationToken)
            {
                var users = await _userService.GetUsersInRoleAtSchools(request.DistrictCode, request.RoleType);
                return Response.Success(users);
            }
        }
    }
}
