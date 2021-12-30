﻿using Microsoft.EntityFrameworkCore;
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
        public Task<List<UserDTO>> GetUsersInRoleAtSchools(string districtCode, RoleType roleType);
        public Task<List<UserDTO>> GetUsersInRoleAtSchool(string schoolCode, RoleType roleType);
        public Task<List<UserDTO>> GetUsersInRoleAtDistrict(string districtCode, RoleType roleType);
        public IQueryable<UserDTO> ExecuteUserDTOQuery(System.Linq.Expressions.Expression<System.Func<User, bool>> expr);

    }

    public class UserService : BaseService, IUserService
    {
        private readonly DataContext _dataContext;
        public UserService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public IQueryable<UserDTO> ExecuteUserDTOQuery(System.Linq.Expressions.Expression<System.Func<User, bool>> expr)
        {
            return _dataContext.Users
                    .Include(x => x.UserBuildingRoles).ThenInclude(x=>x.Role)
                    .Include(x => x.UserBuildingRoles).ThenInclude(x => x.Building)
                    .Where(expr)
                    .Select(x => x.MapToUserDTO());
        }

        public async Task<List<UserDTO>> GetUsersInRoleAtSchools(string districtCode, RoleType roleType)
        {
            var userDTOs = await ExecuteUserDTOQuery(x => 
                    x.UserBuildingRoles.Any(y => y.Building.DistrictCode == districtCode &&
                                                 !String.IsNullOrEmpty(y.Building.SchoolCode) &&
                                                 y.Role.DisplayName == EnumUtils.MapRoleTypeToDisplayName(roleType)))
                    .ToListAsync();

            return userDTOs;
        }

        public async Task<List<UserDTO>> GetUsersInRoleAtSchool(string schoolCode, RoleType roleType)
        {
            var userDTOs = await ExecuteUserDTOQuery(x =>
                                x.UserBuildingRoles.Any(y => y.Building.SchoolCode == schoolCode &&
                                                             y.Role.DisplayName == EnumUtils.MapRoleTypeToDisplayName(roleType)))
                  .ToListAsync();

            return userDTOs;
        }

        public async Task<List<UserDTO>> GetUsersInRoleAtDistrict(string districtCode, RoleType roleType)
        {
            var userDTOs = await ExecuteUserDTOQuery(x =>
                 x.UserBuildingRoles.Any(y => y.Building.DistrictCode == districtCode &&
                                              String.IsNullOrEmpty(y.Building.SchoolCode) &&
                                              y.Role.DisplayName == EnumUtils.MapRoleTypeToDisplayName(roleType)))
                .ToListAsync();

            return userDTOs;
        }
    }

}
