using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Queries;
using SE.Services.Queries;

namespace SE.API.Controllers
{
    [Route("evaluations")]
    [AllowAnonymous]
    public class EvaluationController : ApiControllerBase
    {
        public EvaluationController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("{id:long}")]
        public async Task<IActionResult> GetEvaluationById(long id)
        {
            throw new NotImplementedException();
            //var evaluation = await _mediator.Send(new GetEvaluationByIdQuery(id));
            //return Ok(evaluation);
        }
    }
}
