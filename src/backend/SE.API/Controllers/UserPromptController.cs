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
        /// <returns>no return value</returns>
        [HttpPost()]
        public async Task<ActionResult<UserPromptDTO>> Create([FromBody] CreateUserPromptCommand command)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            return Ok(await _mediator.Send(command, cancelationToken));
        }

        /// <summary>
        /// Updates a UserPrompt
        /// </summary>
        /// <param name="command">the data describing the user prompt</param>
        /// <returns>no return value</returns>
        [HttpPut()]
        public async Task<ActionResult<UserPromptDTO>> UpdateUserPrompt([FromBody] UpdateUserPromptCommand command)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            return Ok(await _mediator.Send(command, cancelationToken));
        }

        [HttpGet("{frameworkContextId:long}/{promptType}")]
        public async Task<ActionResult<List<UserPromptDTO>>> GetUserPromptsForDistrictTier(long frameworkContextId, UserPromptType promptType)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var prompts = await _mediator.Send(new GetUserPromptsForOwnerTierQuery(frameworkContextId, UserPromptTier.DISTRICT_ADMIN, promptType, "", null), cancelationToken);
            return Ok(prompts);
        }

        [HttpGet("{frameworkContextId:long}/{promptType}/{schoolCode}")]
        public async Task<ActionResult<List<UserPromptDTO>>> GetUserPromptsForSchoolTier(long frameworkContextId, UserPromptType promptType, string schoolCode)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var prompts = await _mediator.Send(new GetUserPromptsForOwnerTierQuery(frameworkContextId, UserPromptTier.SCHOOL_ADMIN, promptType, schoolCode, null), cancelationToken);
            return Ok(prompts);
        }

        [HttpGet("{frameworkContextId:long}/{promptType}/{schoolCode}/{evaluatorId}")]
        public async Task<ActionResult<List<UserPromptDTO>>> GetUserPromptsForEvaluatorTier(long frameworkContextId, UserPromptType promptType, string schoolCode, long evaluatorId)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var prompts = await _mediator.Send(new GetUserPromptsForOwnerTierQuery(frameworkContextId, UserPromptTier.EVALUATOR, promptType, schoolCode, evaluatorId), cancelationToken);
            return Ok(prompts);
        }
    }
}
