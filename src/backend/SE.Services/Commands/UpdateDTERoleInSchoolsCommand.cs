using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SE.Data;
using SE.Domain.Entities;
using SE.Core.Models;
using SE.Core.Common.Exceptions;

using SE.Core.Mappers;
using SE.Core.Common;

namespace SE.Core.Commands
{
    public class UpdateDTERoleInSchoolsCommandValidator
    : AbstractValidator<UpdateDTERoleInSchoolsCommand>
    {
        public UpdateDTERoleInSchoolsCommandValidator()
        {
        }
    }
    public sealed class UpdateDTERoleInSchoolsCommand : 
        IRequest<IResponse<Unit>>
    {
        public long UserId{ get; }
        public List<UserBuildingRoleDTO> NewUserBuildingRoles { get; }

        public UpdateDTERoleInSchoolsCommand(long userId, List<UserBuildingRoleDTO> newUserBuildingRoles)
        {
            UserId = userId;
            NewUserBuildingRoles = newUserBuildingRoles;    
        }
    }

    public class UpdateDTERoleInSchoolsCommandHandler :
    IRequestHandler<UpdateDTERoleInSchoolsCommand, IResponse<Unit>>
    {
        private readonly DataContext _dataContext;
        public UpdateDTERoleInSchoolsCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IResponse<Unit>> Handle(UpdateDTERoleInSchoolsCommand request, CancellationToken cancellationToken)
        {
            var currentUserBuildingRoles = await _dataContext.UserBuildingRoles
                .Include(x => x.Building)
                .Include(x => x.Role)
                .Where(x => x.UserId == request.UserId &&
                          x.RoleId == Convert.ToInt64(RoleType.DTE) &&
                          !String.IsNullOrEmpty(x.Building.SchoolCode))
                .ToListAsync();

            List<UserBuildingRole> toRemove = currentUserBuildingRoles
                .Where(x => !request.NewUserBuildingRoles
                .Select(y => y.Id).Contains(x.Id))
                .ToList();

            List<UserBuildingRoleDTO> toAdd = request.NewUserBuildingRoles
                .Where(x => !currentUserBuildingRoles
                .Select(y => y.Id).Contains(x.Id))
                .ToList();

            toRemove.ForEach(x =>
            {
                _dataContext.UserBuildingRoles.Remove(x);
            });

            toAdd.ForEach(x =>
            {
                _dataContext.UserBuildingRoles.Add(x.MapToUserBuildingRole());
            });

            _dataContext.SaveChanges();

            return Response.Success(Unit.Value);
        }
    }
}
