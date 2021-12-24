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

namespace SE.Core.Queries
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
        IRequest<List<UserDTO>>
    {
        public string DistrictCode { get; }
        public RoleType RoleType { get; }

        public GetUsersInRoleInSchoolsQuery(string districtCode, RoleType roleType)
        {
            DistrictCode = districtCode;
            RoleType = roleType;
        }

        internal sealed class GetUsersInRoleInSchoolsQueryHandler : 
            IRequestHandler<GetUsersInRoleInSchoolsQuery, List<UserDTO>>
        {
            private readonly IBuildingService _buildingService;
            public GetUsersInRoleInSchoolsQueryHandler(IBuildingService buildingService)
            {
                _buildingService = buildingService;
            }

            public async Task<List<UserDTO>> Handle(GetUsersInRoleInSchoolsQuery request, CancellationToken cancellationToken)
            {
                var users = await _buildingService.GetUsersInRoleInSchools(request.DistrictCode, request.RoleType);
                return users;
            }
        }
    }
}
