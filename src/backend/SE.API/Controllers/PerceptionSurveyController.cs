using MediatR;
using SE.API.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Commands.PerceptionSurveys;
using SE.Core.Queries.PerceptionSurveys;

namespace SE.API.Controllers
{
    [Route("perception-surveys")]
    public class PerceptionSurveyController : ApiControllerBase
    {
        public PerceptionSurveyController(IMediator mediator) : base(mediator)
        {
        }
        [HttpGet("{id:long}")]
        public async Task<IActionResult> GetPerceptionSurveyById(long id)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var survey = await _mediator.Send(new GetPerceptionSurveyByIdQuery(id), cancelationToken);
            return Ok(survey);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreatePerceptionSurveyCommand command)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            return Ok(await _mediator.Send(command, cancelationToken));
        }
    }
}
