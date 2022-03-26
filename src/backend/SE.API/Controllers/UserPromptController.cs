using MediatR;
using SE.API.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Queries.UserPrompts;
using SE.Domain.Entities;
using SE.Core.Models;
using SE.Core.Commands.UserPrompts;

namespace SE.API.Controllers
{
    [Route("user-prompts")]
    public class UserPromptController : ApiControllerBase
    {
        public UserPromptController(IMediator mediator) : base(mediator)
        {
        }

        /// <summary>
        /// Creates a UserPrompt
        /// </summary>
        /// <param name="command">The data describing the new prompt</param>
        /// <returns></returns>
        [HttpPost()]
        public async Task<ActionResult<UserPromptDTO>> Create([FromBody] CreateUserPromptCommand command)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            return Ok(await _mediator.Send(command, cancelationToken));
        }

        [HttpGet("{frameworkContextId:long}/{ownerTier}/{userId:long}")]
        public async Task<ActionResult<List<UserPromptDTO>>> GetUserPromptsForOwnerTier(long frameworkContextId, UserPromptTier ownerTier, long userId)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var prompts = await _mediator.Send(new GetUserPromptsForOwnerTierQuery(frameworkContextId, ownerTier, userId), cancelationToken);
            return Ok(prompts);
        }
    }
}
