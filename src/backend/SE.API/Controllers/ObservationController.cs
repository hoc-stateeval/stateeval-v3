using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Queries;
using SE.Core.Commands;
using SE.Core.Models;

namespace SE.API.Controllers
{
    [Route("observations")]
    [AllowAnonymous]
    public class ObservationController : ApiControllerBase
    {
        public ObservationController(IMediator mediator) : base(mediator)
        {
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateObservationCommand command)
        {
            return Ok(await _mediator.Send(command));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, UpdateObservationCommand command)
        {
            if (id != command.ObservationId)
            {
                return BadRequest();
            }

            await _mediator.Send(command);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            await _mediator.Send(new DeleteObservationCommand(id));

            return NoContent();
        }
    }
}
