using Microsoft.EntityFrameworkCore;
using SE.Core.Mappers;
using SE.Core.Models;
using SE.Data;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Services
{
    public interface IBuildingService
    {
        public Task<List<BuildingDTO>> GetSchoolsInDistrict(string districtCode);
        public Task<List<UserDTO>> GetUsersInRoleAtDistrict(string districtCode, RoleType roleType);
        public Task<List<UserDTO>> GetUsersInRoleInSchools(string districtCode, RoleType roleType);
        public Task<List<UserDTO>> GetUsersInRoleInSchool(string districtCode, string schoolCode, RoleType roleType);
    }

    public class BuildingService : BaseService, IBuildingService
    {
        private readonly DataContext _dataContext;
        public BuildingService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<UserDTO>> GetUsersInRoleAtDistrict(string districtCode, RoleType roleType)
        {
            var users = await _dataContext.Users
               .Include(x => x.UserBuildingRoles).ThenInclude(x => x.Building)
               .Include(x => x.UserBuildingRoles).ThenInclude(x => x.Role)
               .Where(x => x.UserBuildingRoles.Any(y => y.Building.DistrictCode == districtCode && String.IsNullOrEmpty(y.Building.SchoolCode)) &&
                           x.UserBuildingRoles.Any(y => y.Role.DisplayName == EnumUtils.MapRoleTypeToDisplayName(roleType)))
               .ToListAsync();

            return users.ToList().Select(x => x.MapToUserDTO()).ToList();
        }

        public async Task<List<UserDTO>> GetUsersInRoleInSchools(string districtCode, RoleType roleType)
        {
            var users = await _dataContext.Users
               .Include(x => x.UserBuildingRoles).ThenInclude(x => x.Building)
               .Include(x => x.UserBuildingRoles).ThenInclude(x => x.Role)
               .Where(x => x.UserBuildingRoles.Any(y => y.Building.DistrictCode == districtCode) &&
                           x.UserBuildingRoles.Any(y => y.Role.DisplayName == EnumUtils.MapRoleTypeToDisplayName(roleType)))
               .ToListAsync();

            return users.ToList().Select(x => x.MapToUserDTO()).ToList();
        }

        public async Task<List<UserDTO>> GetUsersInRoleInSchool(string districtCode, string schoolCode, RoleType roleType)
        {
            var users = await _dataContext.Users
               .Include(x => x.UserBuildingRoles).ThenInclude(x => x.Building)
               .Include(x => x.UserBuildingRoles).ThenInclude(x => x.Role)
               .Where(x => x.UserBuildingRoles.Any(y => y.Building.DistrictCode == districtCode && y.Building.SchoolCode == schoolCode) &&
                           x.UserBuildingRoles.Any(y => y.Role.DisplayName == EnumUtils.MapRoleTypeToDisplayName(roleType)))
               .ToListAsync();

            return users.ToList().Select(x => x.MapToUserDTO()).ToList();
        }

        public async Task<List<BuildingDTO>> GetSchoolsInDistrict(string districtCode)
        {
            var schools = await _dataContext.Buildings
                .Where(x => x.IsSchool && x.DistrictCode == districtCode)
                .ToListAsync();

            return schools.ToList().Select(x => x.MapToBuildingDTO()).ToList();
        }
    }
}
