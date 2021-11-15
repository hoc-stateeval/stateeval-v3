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
        public async Task<IActionResult> CreateObservation(CreateObservationCommand command)
        {
            return Ok(await _mediator.Send(command));
        }
    }
}
