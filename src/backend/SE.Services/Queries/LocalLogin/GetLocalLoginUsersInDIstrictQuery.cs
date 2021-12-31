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

namespace SE.Core.Queries.LocalLogin
{
    public class GetLocalLoginUsersInDistrictQueryValidator
    : AbstractValidator<GetLocalLoginUsersInDistrictQuery>
    {
        public GetLocalLoginUsersInDistrictQueryValidator()
        {
            RuleFor(x => x.DistrictCode).NotEmpty();
        }
    }
    public sealed class GetLocalLoginUsersInDistrictQuery :
        IRequest<List<LocalLoginUserDTO>>
    {
        public string DistrictCode { get; }

        public GetLocalLoginUsersInDistrictQuery(string districtCode)
        {
            DistrictCode = districtCode;
        }

        internal sealed class GetLocalLoginUsersInDistrictQueryHandler : 
            IRequestHandler<GetLocalLoginUsersInDistrictQuery, List<LocalLoginUserDTO>>
        {
            private readonly DataContext _dataContext;
            public GetLocalLoginUsersInDistrictQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<List<LocalLoginUserDTO>> Handle(GetLocalLoginUsersInDistrictQuery request, CancellationToken cancellationToken)
            {
                var building = await _dataContext.Buildings
                    .Where(x => !x.IsSchool && x.DistrictCode == request.DistrictCode)
                    .FirstOrDefaultAsync();

                var userBuildingRoles = await _dataContext.UserBuildingRoles
                    .Include(x => x.User)
                    .Include(x => x.Building)
                    .Include(x => x.Role)
                    .Where(x => x.Building.DistrictCode == building.DistrictCode)
                    .ToListAsync();

                var users = userBuildingRoles.Select(x => new LocalLoginUserDTO()
                {
                    Id = x.User.Id,
                    DisplayName = x.User.FirstName + " " + x.User.LastName,
                    UserName = x.User.UserName,
                    DistrictCode = x.Building.DistrictCode,
                    SchoolCode = x.Building.SchoolCode,
                    RoleName = x.Role.DisplayName
                 }).ToList();

                return users;
            }
        }
    }
}
