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
    public class GetUsersInRoleInSchoolQueryValidator
    : AbstractValidator<GetUsersInRoleInSchoolQuery>
    {
        public GetUsersInRoleInSchoolQueryValidator()
        {
            RuleFor(x => x.SchoolCode).NotEmpty();
        }
    }
    public sealed class GetUsersInRoleInSchoolQuery : 
        IRequest<List<UserDTO>>
    {
        public string SchoolCode { get; }   
        public RoleType RoleType { get; }

        public GetUsersInRoleInSchoolQuery(string schoolCode, RoleType roleType)
        {
            SchoolCode = schoolCode;
            RoleType = roleType;
        }

        internal sealed class GetUsersInRoleInSchoolQueryHandler : 
            IRequestHandler<GetUsersInRoleInSchoolQuery, List<UserDTO>>
        {
            private readonly IUserService _userService;
            public GetUsersInRoleInSchoolQueryHandler(IUserService userService)
            {
                _userService = userService;
            }

            public async Task<List<UserDTO>> Handle(GetUsersInRoleInSchoolQuery request, CancellationToken cancellationToken)
            {
                var user = await _userService.GetUsersInRoleAtSchool(request.SchoolCode, request.RoleType);
                return user;
            }
        }
    }
}
