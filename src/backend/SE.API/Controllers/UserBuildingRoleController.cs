using MediatR;
using SE.API.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Commands;
using SE.Core.Queries;
using SE.Domain.Entities;
using SE.Core.Commands.Roles;

namespace SE.API.Controllers
{
    [Route("user-building-roles")]
    public class UserBuildingRolesController : ApiControllerBase
    {
        public UserBuildingRolesController(IMediator mediator) : base(mediator)
        {
        }

        [HttpPut("update-dte-role-in-schools/{userId}")]
        public async Task<IActionResult> UpdateDTERoleInSchools(long userId, [FromBody] UpdateDTERoleInSchoolsCommand command)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            await _mediator.Send(command, cancelationToken);
            return NoContent();
        }
    }
}
