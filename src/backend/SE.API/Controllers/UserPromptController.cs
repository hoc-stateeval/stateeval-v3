using MediatR;
using SE.API.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Queries.UserPrompts;
using SE.Domain.Entities;
using SE.Core.Models;

namespace SE.API.Controllers
{
    [Route("user-prompts")]
    public class UserPromptController : ApiControllerBase
    {
        public UserPromptController(IMediator mediator) : base(mediator)
        {
        }


        [HttpGet("{frameworkContextId:long}/{ownerTier}/{userId:long}")]
        public async Task<ActionResult<List<UserPromptDTO>>> GetUserPromptsForOwnerTier(long frameworkContextId, UserPromptOwnerTier ownerTier, long userId)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var prompts = await _mediator.Send(new GetUserPromptsForOwnerTierQuery(frameworkContextId, ownerTier, userId), cancelationToken);
            return Ok(prompts);
        }
    }
}
