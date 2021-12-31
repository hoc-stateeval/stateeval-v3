
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Commands;
using SE.Core.Queries;
using SE.Domain.Entities;

namespace SE.API.Controllers
{
    [Route("users")]
    [AllowAnonymous]
    public class UserController : ApiControllerBase
    {
        public UserController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetUserByUserName(string username)
        {
            var user = await _mediator.Send(new GetUserByUserNameQuery(username));
            return Ok(user);
        }

        [HttpGet("district/{districtCode}/usersinrole/{roleType}")]
        public async Task<IActionResult> GetUsersInRoleAtDistrict(string districtCode, RoleType roleType)
        {
            var users = await _mediator.Send(new GetUsersInRoleAtDistrictQuery(districtCode, roleType));
            return Ok(users);
        }

        [HttpGet("school/{schoolCode}/usersinrole/{roleType}")]
        public async Task<IActionResult> GetUsersInRoleInSchool(string schoolCode, RoleType roleType)
        {
            var users = await _mediator.Send(new GetUsersInRoleInSchoolQuery(schoolCode, roleType));
            return Ok(users);
        }

        [HttpGet("{districtCode}/usersinroleinschools/{roleType}")]
        public async Task<IActionResult> GetUsersInRoleInSchools(string districtCode, RoleType roleType)
        {
            var users = await _mediator.Send(new GetUsersInRoleInSchoolsQuery(districtCode, roleType));
            return Ok(users);
        }
    }
}

