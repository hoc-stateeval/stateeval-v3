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
    public class GetUsersInRoleInSchoolQueryValidator
    : AbstractValidator<GetUsersInRoleInSchoolQuery>
    {
        public GetUsersInRoleInSchoolQueryValidator()
        {
            RuleFor(x => x.DistrictCode).NotEmpty();
            RuleFor(x => x.SchoolCode).NotEmpty();
            RuleFor(x => x.RoleType).NotEmpty();
        }
    }
    public sealed class GetUsersInRoleInSchoolQuery : 
        IRequest<List<UserDTO>>
    {
        public string DistrictCode { get; }
        public string SchoolCode { get; }   
        public RoleType RoleType { get; }

        public GetUsersInRoleInSchoolQuery(string districtCode, string schoolCode, RoleType roleType)
        {
            DistrictCode = districtCode;
            SchoolCode = schoolCode;
            RoleType = roleType;
        }

        internal sealed class GetUsersInRoleInSchoolQueryHandler : 
            IRequestHandler<GetUsersInRoleInSchoolQuery, List<UserDTO>>
        {
            private readonly IBuildingService _buildingService;
            public GetUsersInRoleInSchoolQueryHandler(IBuildingService buildingService)
            {
                _buildingService = buildingService;
            }

            public async Task<List<UserDTO>> Handle(GetUsersInRoleInSchoolQuery request, CancellationToken cancellationToken)
            {
                var user = await _buildingService.GetUsersInRoleInSchool(request.DistrictCode, request.SchoolCode, request.RoleType);
                return user;
            }
        }
    }
}
