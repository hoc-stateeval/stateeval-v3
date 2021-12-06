using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> GetAssignmentsSummaryForDistrict(long frameworkContextId)
        {
            var summaries = await _mediator.Send(new GetAssignmentsSummaryForDistrictQuery(frameworkContextId));
            return Ok(summaries);
        }
    }
}
