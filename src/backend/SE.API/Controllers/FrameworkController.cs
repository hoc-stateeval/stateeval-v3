﻿using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Queries;
using SE.Services.Queries;

namespace SE.API.Controllers
{
    [Route("frameworks")]
    [AllowAnonymous]
    public class FrameworkController : ApiControllerBase
    {
        public FrameworkController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet]
        [Route("{id:long}")]
        public async Task<IActionResult> GetFrameworkById(long id)
        {
            var framework = await _mediator.Send(new GetFrameworkByIdQuery(id));
            return Ok(framework);
        }
    }
}
