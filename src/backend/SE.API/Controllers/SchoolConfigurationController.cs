using MediatR;
using SE.API.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Commands;
using SE.Core.Queries;
using SE.Domain.Entities;

namespace SE.API.Controllers
{
    [Route("school-configurations")]
    public class SchoolConfigurationController : ApiControllerBase
    {
        public SchoolConfigurationController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("framework-context/{frameworkContextId:long}")]
        public async Task<IActionResult> GetSchoolConfigurationsForFrameworkContext(long frameworkContextId)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var config = await _mediator.Send(new GetSchoolConfigurationsForFrameworkContextQuery(frameworkContextId), cancelationToken);
            return Ok(config);
        }

        [HttpGet("{id:long}")]
        public async Task<IActionResult> GetSchoolConfigurationById(long id)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var config = await _mediator.Send(new GetSchoolConfigurationByIdQuery(id), cancelationToken);
            return Ok(config);
        }

        [HttpPut("{id:long}")]
        public async Task<IActionResult> UpdateSchoolConfiguration(long id, [FromBody] UpdateSchoolConfigurationCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            await _mediator.Send(command, cancelationToken);
            return NoContent();
        }

        [HttpPut("{frameworkContextId:long}/delegate-evaluation-setup/{delegate}")]
        public async Task<IActionResult> UpdateSchoolConfigurationEvaluationSetup(long frameworkContextId, [FromBody] UpdateSchoolConfigurationCommand command)
        {
            if (frameworkContextId != command.Id)
            {
                return BadRequest();
            }
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            await _mediator.Send(command, cancelationToken);
            return NoContent();
        }


        [HttpPut("{frameworkContextId:long}/delegate-evaluation-setup")]
        public async Task<IActionResult> DelegateEvaluationSetup(long frameworkContextId, [FromBody] DelegateEvaluationSetupCommand command)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            await _mediator.Send(command, cancelationToken);
            return NoContent();
        }
    }
}
