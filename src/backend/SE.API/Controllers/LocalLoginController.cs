using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Queries;
using SE.Domain.Entities;
using SE.Services.Queries;

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
            var districts = await _mediator.Send(new GetLocalLoginDistrictsQuery());
            return Ok(districts);
        }

        [HttpGet]
        [Route("users/{districtCode}")]
        public async Task<IActionResult> GetUsers(string districtCode)
        {
            var users = await _mediator.Send(new GetLocalLoginUsersInDistrictQuery(districtCode));
            return Ok(users);
        }
    }
}
