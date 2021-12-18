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

        [HttpGet("tr-assignments-summary/{frameworkContextId}")]
        public async Task<IActionResult> GetTeacherAssignmentsSummaryForDistrict(long frameworkContextId)
        {
            var summaries = await _mediator.Send(new GetTeacherAssignmentsSummaryForDistrictQuery(frameworkContextId));
            return Ok(summaries);
        }

        [HttpGet("tr-assignments-summary/assignments-detail/{frameworkContextId}/{schoolCode}")]
        public async Task<IActionResult> GetTeacherAssignmentsDataForSchool(long frameworkContextId, string schoolCode)
        {
            var result = await _mediator.Send(new GetTeacherAssignmentDataForSchoolQuery(frameworkContextId, schoolCode));
            return Ok(result);
        }

        [HttpGet("pr-assignments-detail/{frameworkContextId}")]
        public async Task<IActionResult> GetPrincipalAssignmentsDataForDistrict(long frameworkContextId)
        {
            var result = await _mediator.Send(new GetPrincipalAssignmentDataForDistrictQuery(frameworkContextId));
            return Ok(result);
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
