
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Commands;
using SE.Core.Queries;
using SE.Domain.Entities;
using SE.Services.Queries;

namespace SE.API.Controllers
{
    [Route("users")]
    [AllowAnonymous]
    public class UserController : ApiControllerBase
    {
        public UserController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetUserByUserName(string username)
        {
            var user = await _mediator.Send(new GetUserByUserNameQuery(username));
            return Ok(user);
        }
    }
}

