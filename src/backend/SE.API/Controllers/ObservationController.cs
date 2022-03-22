using MediatR;
using SE.API.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Queries;
using SE.Core.Commands;
using SE.Core.Models;
using SE.Core.Commands.Observations;
using SE.Core.Queries.Observations;

namespace SE.API.Controllers
{
    [Route("observations")]
    public class ObservationController : ApiControllerBase
    {
        public ObservationController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("evaluation/{evaluationId:long}")]
        public async Task<ActionResult<List<ObservationDTO>>> GetObservationsForEvaluation(long evaluationId)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var observations = await _mediator.Send(new GetObservationsForEvaluationQuery(evaluationId), cancelationToken);
            return Ok(observations);
        }

        [HttpPost("evaluation/{evaluationId:long}")]
        public async Task<ActionResult<ObservationDTO>> Create(long evaluationId, CreateObservationCommand command)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            return Ok(await _mediator.Send(command, cancelationToken));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(long id, UpdateObservationCommand command)
        {
            if (id != command.ObservationId)
            {
                return BadRequest();
            }

            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            await _mediator.Send(command, cancelationToken);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(long id)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            await _mediator.Send(new DeleteObservationCommand(id), cancelationToken);

            return NoContent();
        }
    }
}
