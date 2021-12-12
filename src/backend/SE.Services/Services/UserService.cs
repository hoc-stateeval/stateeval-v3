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
    public interface IUserService
    {
        public Task<List<UserDTO>> GetUsersInRoleAtDistrictBuildings(string districtCode, string roleName);
        public Task<List<UserDTO>> GetUsersInRoleAtSchool(string schoolCode, string roleName);
        public Task<List<UserDTO>> GetUsersInRoleAtDistrict(string districtCode, string roleName);
    }

    public class UserService : BaseService, IUserService
    {
        private readonly DataContext _dataContext;
        public UserService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        private IQueryable<User> GetUsersWithBuildingRoleNavigationIncluded()
        {
            return _dataContext.Users
                    .Include(x => x.UserBuildingRoles).ThenInclude(x => x.Role)
                    .Include(x => x.UserBuildingRoles).ThenInclude(x => x.Building);
        }

        public async Task<List<UserDTO>> GetUsersInRoleAtDistrictBuildings(string districtCode, string roleName)
        {
            var query = GetUsersWithBuildingRoleNavigationIncluded();
            var users = await query
                    .Where(u => u.UserBuildingRoles.Any(r => r.Role.DisplayName == roleName
                                                            && r.Building.SchoolCode != ""
                                                            && r.Building.DistrictCode == districtCode))
                    //.OrderBy(u => new { u.LastName, u.FirstName })
                    .ToListAsync();

            return users.ToList().Select(x => x.MapToUserDTO(null)).ToList();
        }

        public async Task<List<UserDTO>> GetUsersInRoleAtSchool(string schoolCode, string roleName)
        {
            var query = GetUsersWithBuildingRoleNavigationIncluded();
            var users = await query
                    .Where(u => u.UserBuildingRoles.Any(r => r.Role.DisplayName == roleName
                                                            && r.Building.SchoolCode == schoolCode))
                   // .OrderBy(u => new { u.LastName, u.FirstName })
                    .ToListAsync();

            return users.ToList().Select(x => x.MapToUserDTO(null)).ToList();
        }

        public async Task<List<UserDTO>> GetUsersInRoleAtDistrict(string districtCode, string roleName)
        {
            var query = GetUsersWithBuildingRoleNavigationIncluded();
            var users = await query
                    .Where(u => u.UserBuildingRoles.Any(r => r.Role.DisplayName == roleName
                                                            && r.Building.DistrictCode == districtCode))
                   // .OrderBy(u => new { u.LastName, u.FirstName })
                    .ToListAsync();

            return users.ToList().Select(x => x.MapToUserDTO(null)).ToList();
        }
    }

}
