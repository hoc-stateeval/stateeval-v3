//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using MediatR;
//using Microsoft.AspNetCore.Authorization;

using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SE.API.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Authorize(AuthenticationSchemes = Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme)]
    //  [Authorize]
    public class ApiControllerBase : ControllerBase
    {
        protected readonly IMediator _mediator;

        public ApiControllerBase(IMediator mediator)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        }
    }
}
