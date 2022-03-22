
using MediatR;
using SE.API.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Queries;
using SE.Core.Queries.WorkAreaContexts;
using SE.Core.Models;

namespace SE.API.Controllers
{
    [Route("workarea-contexts")]
    public class WorkAreaContextController : ApiControllerBase
    {
        public WorkAreaContextController(IMediator mediator) : base(mediator)
        {
        }

        /// <summary>
        /// Get a collection of the work area contexts for the user.
        /// </summary>
        /// <param name="userId">the user id</param>
        /// <returns>
        /// A collection of the work area contexts for the current user.
        /// </returns>
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<List<WorkAreaContextDTO>>> GetWorkAreaContextsForUser(long userId)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var workAreaContexts = await _mediator.Send(new GetWorkAreaContextsForUserQuery(userId), cancelationToken);
            return Ok(workAreaContexts);
        }
        /// <summary>
        /// Get the work area context for the user for the given framework context. For example, a
        /// principal would have a framework context for evaluating teachers as well as one for his own 
        /// evaluation, and a work area context for each.
        /// </summary>
        /// <param name="frameworkContextId">the framework context id</param>
        /// <param name="userId">the user id</param>
        /// <param name="schoolCode">the school code. Can be entpy if it is a district-level user/role </param>
        /// <returns></returns>

        [HttpGet("user/{frameworkContextId}/{userId}/{schoolCode?}")]
        public async Task<ActionResult<WorkAreaContextDTO>> GetWorkAreaContextForUser(long frameworkContextId, long userId, string schoolCode)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var workAreaContext = await _mediator.Send(new GetWorkAreaContextForUserQuery(frameworkContextId, userId, schoolCode), cancelationToken);
            return Ok(workAreaContext);
        }
    }
}

