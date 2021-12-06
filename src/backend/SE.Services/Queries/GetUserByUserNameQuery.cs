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

namespace SE.Core.Queries
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
            public GetUserByUserNameQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<UserDTO> Handle(GetUserByUserNameQuery request, CancellationToken cancellationToken)
            {
                User User = await _dataContext.Users.Where(x => x.UserName == request.UserName).FirstOrDefaultAsync();
                UserDTO userDTO = new UserDTO()
                {
                    Id = User.Id,
                    FirstName = User.FirstName,
                    LastName = User.LastName,
                    DisplayName = User.FirstName + " "  + User.LastName,
                    Email = User.EmailAddress,
                    ProfileImageUrl = User.ProfileImageUrl,
                    UserName = User.UserName,
                };

                return userDTO;
            }
        }
    }
}
