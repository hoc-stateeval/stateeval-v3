using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Commands;
using SE.Core.Queries;
using SE.Domain.Entities;
using SE.Services.Queries;

namespace SE.API.Controllers
{
    [Route("school-configurations")]
    [AllowAnonymous]
    public class SchoolConfigurationController : ApiControllerBase
    {
        public SchoolConfigurationController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("framework-context/{frameworkContextId:long}")]
        public async Task<IActionResult> GetSchoolConfigurationsForFrameworkContext(long frameworkContextId)
        {
            var config = await _mediator.Send(new GetSchoolConfigurationsForFrameworkContextQuery(frameworkContextId));
            return Ok(config);
        }

        [HttpGet("{id:long}")]
        public async Task<IActionResult> GetSchoolConfigurationById(long id)
        {
            var config = await _mediator.Send(new GetSchoolConfigurationByIdQuery(id));
            return Ok(config);
        }

        [HttpPut("{id:long}")]
        public async Task<IActionResult> UpdateSchoolConfiguration(long id, [FromBody] UpdateSchoolConfigurationCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }
            await _mediator.Send(command);
            return NoContent();
        }

        [HttpPut("{frameworkContextId:long}/delegate-evaluation-setup/{delegate}")]
        public async Task<IActionResult> UpdateSchoolConfigurationEvaluationSetup(long frameworkContextId, [FromBody] UpdateSchoolConfigurationCommand command)
        {
            if (frameworkContextId != command.Id)
            {
                return BadRequest();
            }
            await _mediator.Send(command);
            return NoContent();
        }


        [HttpPut("{frameworkContextId:long}/delegate-evaluation-setup")]
        public async Task<IActionResult> DelegateEvaluationSetup(long frameworkContextId, [FromBody] DelegateEvaluationSetupCommand command)
        {
            await _mediator.Send(command);
            return NoContent();
        }
    }
}
