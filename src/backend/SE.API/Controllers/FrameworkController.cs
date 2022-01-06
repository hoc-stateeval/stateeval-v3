using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Queries;

namespace SE.API.Controllers
{
    [Route("frameworks")]
    [AllowAnonymous]
    public class FrameworkController : ApiControllerBase
    {
        public FrameworkController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("{id:long}")]
        public async Task<IActionResult> GetFrameworkById(long id)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var framework = await _mediator.Send(new GetFrameworkByIdQuery(id), cancelationToken);
            return Ok(framework);
        }
    }
}
