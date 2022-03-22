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

        /// <summary>
        /// This is a specialized endpoint, that returns the data necessary to build the Assignments 
        /// screen for the district-level summary
        /// </summary>
        /// <param name="frameworkContextId">the framework context id for the assignments data</param>
        /// <returns>
        /// A collection of SchoolSummaryAssignmentDataDTO objects to build the district assignment summary 
        /// for each school.
        /// </returns>
        [HttpGet("district-summary/{frameworkContextId}")]
        public async Task<ActionResult<List<SchoolSummaryAssignmentDataDTO>>> GetDistrictSummaryAssignmentData(long frameworkContextId)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var summaries = await _mediator.Send(new GetDistrictSummaryAssignmentDataQuery(frameworkContextId), cancelationToken);
            return Ok(summaries);
        }

        /// <summary>
        /// This is specialized endpoint to support the Assignments screen for detailed assignment information about
        /// teachers or principals. The Assignments screen for teacher evaluations are shown in the context of a
        /// school, whereas the Assignments screen for principal evaluations shows all principals across the district
        /// in a single screen. When the framework context id is for principal evaluations, the school code parameter
        /// will be empty.
        /// </summary>
        /// <param name="frameworkContextId">the framework context id for the assignment data</param>
        /// <param name="schoolCode">the school code for the assignment data. this will be empty when the framework 
        /// context id is for principal evaluations</param>
        /// <returns>
        /// A DetailAssignmentDataDTO containing the assignment details for each user in the framewwork context
        /// </returns>
        [HttpGet("detail/{frameworkContextId}/{schoolCode?}")]
        public async Task<ActionResult<DetailAssignmentDataDTO>> GetDetailAssignmentDataQuery(long frameworkContextId, string schoolCode)
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
