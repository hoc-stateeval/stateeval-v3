using MediatR;
using SE.API.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Queries;
using SE.Core.Queries.Frameworks;
using SE.Core.Models;

namespace SE.API.Controllers
{
    [Route("frameworks")]
    public class FrameworkController : ApiControllerBase
    {
        public FrameworkController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("{id:long}")]
        public async Task<ActionResult<FrameworkDTO>> GetFrameworkById(long id)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var framework = await _mediator.Send(new GetFrameworkByIdQuery(id), cancelationToken);
            return Ok(framework);
        }
    }
}
