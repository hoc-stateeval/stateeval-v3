using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Commands;
using SE.Core.Queries;
using SE.Domain.Entities;
using SE.Services.Queries;

namespace SE.API.Controllers
{
    [Route("assignments")]
    [AllowAnonymous]
    public class AssignmentsController : ApiControllerBase
    {
        public AssignmentsController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("{frameworkContextId}")]
        public async Task<IActionResult> GetAssignmentsSummaryForFrameworkContext(long frameworkContextId)
        {
            var summaries = await _mediator.Send(new GetAssignmentsSummaryForDistrictQuery(frameworkContextId));
            return Ok(summaries);
        }

        [HttpPut("{frameworkContextId}/delegate")]
        public async Task<IActionResult> DelegateAssignments(long frameworkContextId, DelegateAssignmentsCommand command)
        {
            if (frameworkContextId != command.FrameworkContextId)
            {
                return BadRequest();
            }

            await _mediator.Send(command);
            return NoContent();
        }
    }
}
