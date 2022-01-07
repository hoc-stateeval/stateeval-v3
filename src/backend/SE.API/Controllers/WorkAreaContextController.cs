
using MediatR;
using SE.API.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Queries;

namespace SE.API.Controllers
{
    [Route("workarea-contexts")]
    public class WorkAreaContextController : ApiControllerBase
    {
        public WorkAreaContextController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetWorkAreaContextsForUser(long userId)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var workAreaContexts = await _mediator.Send(new GetWorkAreaContextsForUserQuery(userId), cancelationToken);
            return Ok(workAreaContexts);
        }

        [HttpGet("user/{frameworkContextId}/{userId}/{schoolCode?}")]
        public async Task<IActionResult> GetWorkAreaContextForUser(long frameworkContextId, long userId, string schoolCode)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var workAreaContext = await _mediator.Send(new GetWorkAreaContextForUserQuery(frameworkContextId, userId, schoolCode), cancelationToken);
            return Ok(workAreaContext);
        }
    }
}

