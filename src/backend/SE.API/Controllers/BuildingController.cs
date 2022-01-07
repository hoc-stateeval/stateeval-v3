using MediatR;
using SE.API.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Queries;
using SE.Domain.Entities;

namespace SE.API.Controllers
{
    [Route("buildings")]
    public class BuildingController : ApiControllerBase
    {
        public BuildingController(IMediator mediator) : base(mediator)
        {
        }

        [Authorize]
        [HttpGet("{districtcode}/schools")]
        public async Task<IActionResult> GetSchoolsInDistrict(string districtCode)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var schools = await _mediator.Send(new GetSchoolsInDistrictQuery(districtCode), cancelationToken);
            return Ok(schools);
        }
    }
}
