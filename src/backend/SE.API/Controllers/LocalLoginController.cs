using MediatR;
using SE.API.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Queries.LocalLogin;
using SE.Domain.Entities;

namespace SE.API.Controllers
{

    [Route("local-login")]
    public class LocalLoginController : ApiControllerBase
    {
        public LocalLoginController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        [Route("districts")]
        [AllowAnonymous]
        public async Task<IActionResult> GetDistricts()
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var districts = await _mediator.Send(new GetLocalLoginDistrictsQuery(), cancelationToken);
            return Ok(districts);
        }

        [HttpGet]
        [Route("users/{districtCode}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUsers(string districtCode)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var users = await _mediator.Send(new GetLocalLoginUsersInDistrictQuery(districtCode), cancelationToken);
            return Ok(users);
        }
    }
}
