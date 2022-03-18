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
using SE.Core.Mappers;
using SE.Core.Services;
using SE.Core.Common;

namespace SE.Core.Queries.Users
{
    public class GetUserByUserNameQueryValidator
    : AbstractValidator<GetUserByUserNameQuery>
    {
        public GetUserByUserNameQueryValidator()
        {
            RuleFor(x => x.UserName).NotEmpty();
        }
    }
    public sealed class GetUserByUserNameQuery : 
        IRequest<UserDTO>
    {
        public string UserName { get; }

        public GetUserByUserNameQuery(string userName)
        {
            UserName = userName;
        }

        internal sealed class GetUserByUserNameQueryHandler : 
            IRequestHandler<GetUserByUserNameQuery, UserDTO>
        {
            private readonly DataContext _dataContext;
            private readonly IUserService _userService;
            public GetUserByUserNameQueryHandler(DataContext dataContext, IUserService userService)
            {
                _dataContext = dataContext;
                _userService = userService; 
            }

            public async Task<UserDTO> Handle(GetUserByUserNameQuery request, CancellationToken cancellationToken)
            {
                var userDTO = await _userService.GetUserByUserName(request.UserName);
                return userDTO;
            }
        }
    }
}
