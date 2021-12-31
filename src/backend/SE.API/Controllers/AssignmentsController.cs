using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Commands;
using SE.Core.Queries.Assignments;
using SE.Domain.Entities;
using SE.Core.Models;

namespace SE.API.Controllers
{
    [Route("assignments")]
    [AllowAnonymous]
    public class AssignmentsController : ApiControllerBase
    {
        public AssignmentsController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("district-summary/{frameworkContextId}")]
        public async Task<IActionResult> GetDistrictSummaryAssignmentData(long frameworkContextId)
        {
            var summaries = await _mediator.Send(new GetDistrictSummaryAssignmentDataQuery(frameworkContextId));
            return Ok(summaries);
        }

        [HttpGet("detail/{frameworkContextId}/{schoolCode?}")]
        public async Task<IActionResult> GetDetailAssignmentDataQuery(long frameworkContextId, string schoolCode)
        {
            if (!String.IsNullOrEmpty(schoolCode))
            {
                var result = await _mediator.Send(new GetSchoolDetailAssignmentDataQuery(frameworkContextId, schoolCode));
                return Ok(result);
            }
            else
            {
                var result = await _mediator.Send(new GetDistrictDetailAssignmentDataQuery(frameworkContextId));
                return Ok(result);

            }
        }
    }
}
