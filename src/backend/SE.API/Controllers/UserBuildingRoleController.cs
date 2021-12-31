using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Commands;
using SE.Core.Queries;
using SE.Domain.Entities;

namespace SE.API.Controllers
{
    [Route("user-building-roles")]
    [AllowAnonymous]
    public class UserBuildingRolesController : ApiControllerBase
    {
        public UserBuildingRolesController(IMediator mediator) : base(mediator)
        {
        }

        [HttpPut("update-dte-role-in-schools/{userId}")]
        public async Task<IActionResult> UpdateDTERoleInSchools(long userId, [FromBody] UpdateDTERoleInSchoolsCommand command)
        {
            await _mediator.Send(command);
            return NoContent();
        }
    }
}
