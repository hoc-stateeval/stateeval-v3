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
        IRequest<List<UserDTO>>
    {
        public string DistrictCode { get; }
        public RoleType RoleType { get; }

        public GetUsersInRoleAtDistrictQuery(string districtCode, RoleType roleType)
        {
            DistrictCode = districtCode;
            RoleType = roleType;
        }

        internal sealed class GetUsersInRoleAtDistrictQueryHandler : 
            IRequestHandler<GetUsersInRoleAtDistrictQuery, List<UserDTO>>
        {
            private readonly IBuildingService _buildingService;
            public GetUsersInRoleAtDistrictQueryHandler(IBuildingService buildingService)
            {
                _buildingService = buildingService;
            }

            public async Task<List<UserDTO>> Handle(GetUsersInRoleAtDistrictQuery request, CancellationToken cancellationToken)
            {
                var user = await _buildingService.GetUsersInRoleAtDistrict(request.DistrictCode, request.RoleType);
                return user;
            }
        }
    }
}
