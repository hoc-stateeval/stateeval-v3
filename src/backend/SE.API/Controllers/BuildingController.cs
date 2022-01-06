using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Queries;
using SE.Domain.Entities;

namespace SE.API.Controllers
{
    [Route("buildings")]
    [AllowAnonymous]
    public class BuildingController : ApiControllerBase
    {
        public BuildingController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("{districtcode}/schools")]
        public async Task<IActionResult> GetSchoolsInDistrict(string districtCode)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var schools = await _mediator.Send(new GetSchoolsInDistrictQuery(districtCode), cancelationToken);
            return Ok(schools);
        }
    }
}
