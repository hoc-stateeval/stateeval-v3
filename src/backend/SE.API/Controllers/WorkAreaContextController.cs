
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Queries;

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

        [HttpGet("user/{frameworkContextId}/{userId}/{schoolCode?}")]
        public async Task<IActionResult> GetWorkAreaContextForUser(long frameworkContextId, long userId, string schoolCode)
        {
            var workAreaContext = await _mediator.Send(new GetWorkAreaContextForUserQuery(frameworkContextId, userId, schoolCode));
            return Ok(workAreaContext);
        }
    }
}

