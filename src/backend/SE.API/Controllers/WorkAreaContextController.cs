
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Services.Queries;

namespace SE.API.Controllers
{
    [Route("workarea-contexts")]
    [AllowAnonymous]
    public class WorkAreaContextController : ApiControllerBase
    {
        public WorkAreaContextController(IMediator mediator) : base(mediator)
        {
        }
    }
}

