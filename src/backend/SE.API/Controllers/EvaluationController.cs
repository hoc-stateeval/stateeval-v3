using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Commands;
using SE.Core.Queries;
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
            throw new NotImplementedException();
            var evaluation = await _mediator.Send(new GetEvaluationByIdQuery(id));
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
            return Ok(result);
        }

        [HttpPut("{id}/updateevaluator")]
        public async Task<IActionResult> UpdateEvaluator(long id, [FromBody] UpdateEvaluatorCommand command)
        {
            if (id != command.EvaluationId)
            {
                return BadRequest();
            }
            var result = await _mediator.Send(command);
            return Ok(result);
        }
    }
}
