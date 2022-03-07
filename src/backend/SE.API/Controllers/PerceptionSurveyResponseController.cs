using MediatR;
using SE.API.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Commands.PerceptionSurveys;
using SE.Core.Queries.PerceptionSurveys;

namespace SE.API.Controllers
{
    [Route("perception-survey-responses")]
    public class PerceptionSurveyResponseController : ApiControllerBase
    {
        public PerceptionSurveyResponseController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("{surveyId}")]
        public async Task<IActionResult> GetPerceptionSurveyResponses(long surveyId)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var responses = await _mediator.Send(new GetPerceptionSurveyResponsesQuery(surveyId), cancelationToken);
            return Ok(responses);
        }
    }
}
