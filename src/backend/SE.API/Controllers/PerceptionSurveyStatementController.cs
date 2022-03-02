using MediatR;
using SE.API.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Commands.PerceptionSurveys;
using SE.Core.Queries.PerceptionSurveys;

namespace SE.API.Controllers
{
    [Route("perception-survey-statements")]
    public class PerceptionSurveyStatementController : ApiControllerBase
    {
        public PerceptionSurveyStatementController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("{tagName}")]
        public async Task<IActionResult> GetPerceptionSurveyStatementForFrameworkTagName(string tagName)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var survey = await _mediator.Send(new GetPerceptionSurveyStatementsForFrameworkTagNameQuery(tagName), cancelationToken);
            return Ok(survey);
        }

        [HttpGet("{surveyId}/checkedStatementIds")]
        public async Task<IActionResult> GetPerceptionSurveyCheckedStatementIds(long surveyId)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var survey = await _mediator.Send(new GetPerceptionSurveyCheckedStatementsIdsQuery(surveyId), cancelationToken);
            return Ok(survey);
        }
    }
}
