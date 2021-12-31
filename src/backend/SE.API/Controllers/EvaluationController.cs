using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Commands;
using SE.Core.Queries;
using SE.Domain.Entities;
using SE.Services.Queries;

namespace SE.API.Controllers
{
    [Route("evaluations")]
    [AllowAnonymous]
    public class EvaluationController : ApiControllerBase
    {
        public EvaluationController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEvaluationById(long id)
        {
            var evaluation = await _mediator.Send(new GetEvaluationByIdQuery(id));
            return Ok(evaluation);
        }

        [HttpGet("historical/{userId}")]
        public async Task<IActionResult> GetHistoricalEvaluationsForUser(long userId)
        {
            var evaluation = await _mediator.Send(new GetHistoricalEvaluationsForUserQuery(userId));
            return Ok(evaluation);
        }

        [HttpPut("{id}/updateplantype")]
        public async Task<IActionResult> UpdateEvaluateePlanType(long id, [FromBody] UpdateEvaluateePlanTypeCommand command)
        {
            if (id != command.EvaluationId)
            {
                return BadRequest();
            }
            var result = await _mediator.Send(command);
            var evaluation = await _mediator.Send(new GetEvaluationByIdQuery(id));
            return Ok(evaluation);
        }

        [HttpPut("{id}/updateevaluator")]
        public async Task<IActionResult> UpdateEvaluator(long id, [FromBody] UpdateEvaluatorCommand command)
        {
            if (id != command.EvaluationId)
            {
                return BadRequest();
            }
            var result = await _mediator.Send(command);
            var evaluation = await _mediator.Send(new GetEvaluationByIdQuery(id));
            return Ok(evaluation);
        }

        [HttpGet("workarea-context/{workAreaContextId}")]
        public async Task<IActionResult> GetEvaluationsForWorkAreaContext(long workAreaContextId)
        {
            var evaluations = await _mediator.Send(new GetEvaluationsForWorkAreaContextQuery(workAreaContextId));
            return Ok(evaluations);
        }

        [HttpGet("{frameworkContextId}/{evaluatorId}")]
        public async Task<IActionResult> GetEvaluationsForEvaluator(long frameworkContextId, long evaluatorId)
        {
            var evaluations = await _mediator.Send(new GetEvaluationsForEvaluatorQuery(frameworkContextId, evaluatorId));
            return Ok(evaluations);
        }

        [HttpGet("{frameworkContextId}/{schoolCode}")]
        public async Task<IActionResult> GetEvaluationsForSchool(long frameworkContextId, string schoolCode)
        {
            var evaluations = await _mediator.Send(new GetEvaluationsForSchoolQuery(frameworkContextId, schoolCode));
            return Ok(evaluations);
        }
    }
}
