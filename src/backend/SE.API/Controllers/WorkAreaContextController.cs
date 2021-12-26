
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Services.Queries;

namespace SE.API.Controllers
{
    [Route("workarea-contexts")]
    [AllowAnonymous]
    public class WorkAreaContextController : ApiControllerBase
    {
        public WorkAreaContextController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetWorkAreaContextsForUser(long userId)
        {
            var workAreaContexts = await _mediator.Send(new GetWorkAreaContextsForUserQuery(userId));
            return Ok(workAreaContexts);
        }
    }
}

