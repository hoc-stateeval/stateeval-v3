using MediatR;
using SE.API.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Queries;
using SE.Core.Commands;
using SE.Core.Models;
using SE.Core.Commands.Observations;

namespace SE.API.Controllers
{
    [Route("observations")]
    public class ObservationController : ApiControllerBase
    {
        public ObservationController(IMediator mediator) : base(mediator)
        {
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateObservationCommand command)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            return Ok(await _mediator.Send(command, cancelationToken));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, UpdateObservationCommand command)
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
        public async Task<IActionResult> Delete(long id)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            await _mediator.Send(new DeleteObservationCommand(id), cancelationToken);

            return NoContent();
        }
    }
}
