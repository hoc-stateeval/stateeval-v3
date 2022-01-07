using MediatR;
using SE.API.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Commands;
using SE.Core.Queries.Assignments;
using SE.Domain.Entities;
using SE.Core.Models;

namespace SE.API.Controllers
{
    [Route("assignments")]
    public class AssignmentsController : ApiControllerBase
    {
        public AssignmentsController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("district-summary/{frameworkContextId}")]
        public async Task<IActionResult> GetDistrictSummaryAssignmentData(long frameworkContextId)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var summaries = await _mediator.Send(new GetDistrictSummaryAssignmentDataQuery(frameworkContextId), cancelationToken);
            return Ok(summaries);
        }

        [HttpGet("detail/{frameworkContextId}/{schoolCode?}")]
        public async Task<IActionResult> GetDetailAssignmentDataQuery(long frameworkContextId, string schoolCode)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;

            if (!String.IsNullOrEmpty(schoolCode))
            {
                var result = await _mediator.Send(new GetSchoolDetailAssignmentDataQuery(frameworkContextId, schoolCode), cancelationToken);
                return Ok(result);
            }
            else
            {
                var result = await _mediator.Send(new GetDistrictDetailAssignmentDataQuery(frameworkContextId), cancelationToken);
                return Ok(result);

            }
        }
    }
}
