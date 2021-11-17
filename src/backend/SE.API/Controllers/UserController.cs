﻿
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Commands;
using SE.Core.Queries;
using SE.Services.Queries;

namespace SE.API.Controllers
{
    [Route("users")]
    [AllowAnonymous]
    public class UserController : ApiControllerBase
    {
        public UserController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        [Route("{username}")]
        public async Task<IActionResult> GetUserByUserName(string username)
        {
            var user = await _mediator.Send(new GetUserByUserNameQuery(username));
            return Ok(user);
        }

        [HttpGet]
        [Route("{userId}/workarea-contexts")]
        public async Task<IActionResult> GetWorkAreaContextsForUser(long userId)
        {
            var user = await _mediator.Send(new GetWorkAreaContextsForUserQuery(userId));
            return Ok(user);
        }

        [HttpGet]
        [Route("{userId}/workarea-contexts/{workAreaContextId}/evaluations")]
        public async Task<IActionResult> GetEvaluationsForWorkAreaContext(long userId, long workAreaContextId)
        {
            var user = await _mediator.Send(new GetEvaluationsForWorkAreaContextQuery(userId, workAreaContextId));
            return Ok(user);
        }

        [HttpPut("[action]")]
        [Route("{userId}/workarea-contexts/{workAreaContextId}/evaluations/{evaluationId}")]
        public async Task<IActionResult> UpdateEvaluateePlanTypeToFocused(long userId, long workAreaContextId, long evaluationId, UpdateEvaluateePlanTypeToFocusedCommand command)
        {
            if (userId != command.UserId || workAreaContextId != command.WorkAreaContextId || evaluationId != command.EvaluationId)
            {
                return BadRequest();
            }
            await _mediator.Send(command);
            return NoContent();
        }

        [HttpPut("[action]")]
        [Route("{userId}/workarea-contexts/{workAreaContextId}/evaluations/{evaluationId}")]
        public async Task<IActionResult> UpdateEvaluateePlanTypeToFocused(long userId, long workAreaContextId, long evaluationId, UpdateEvaluateePlanTypeToComprehensiveCommand command)
        {
            if (userId != command.UserId || workAreaContextId != command.WorkAreaContextId || evaluationId != command.EvaluationId)
            {
                return BadRequest();
            }
            await _mediator.Send(command);
            return NoContent();
        }
    }
}

