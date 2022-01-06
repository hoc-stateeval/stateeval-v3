using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Queries.LocalLogin;
using SE.Domain.Entities;

namespace SE.API.Controllers
{

    [Route("local-login")]
    [AllowAnonymous]
    public class LocalLoginController : ApiControllerBase
    {
        public LocalLoginController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        [Route("districts")]
        public async Task<IActionResult> GetDistricts()
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var districts = await _mediator.Send(new GetLocalLoginDistrictsQuery(), cancelationToken);
            return Ok(districts);
        }

        [HttpGet]
        [Route("users/{districtCode}")]
        public async Task<IActionResult> GetUsers(string districtCode)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var users = await _mediator.Send(new GetLocalLoginUsersInDistrictQuery(districtCode), cancelationToken);
            return Ok(users);
        }
    }
}
