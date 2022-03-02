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


        [HttpGet("evaluation/{evaluationId:long}")]
        public async Task<IActionResult> GetPerceptionSurvesyForEvaluation(long evaluationId)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var surveys = await _mediator.Send(new GetPerceptionSurveysForEvaluationQuery(evaluationId), cancelationToken);
            return Ok(surveys);
        }

        [HttpGet("{id:long}")]
        public async Task<IActionResult> GetPerceptionSurveyById(long id)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var survey = await _mediator.Send(new GetPerceptionSurveyByIdQuery(id), cancelationToken);
            return Ok(survey);
        }

        [HttpPost("evaluation/{evaluationId:long}")]
        public async Task<IActionResult> Create(long evaluationId, [FromBody] CreatePerceptionSurveyCommand command)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            return Ok(await _mediator.Send(command, cancelationToken));
        }

        [HttpPost("add-statement/{surveyId:long}/{statementId:long}")]
        public async Task<IActionResult> AddStatementToSurvey(long surveyId, long statementId)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var survey = await _mediator.Send(new AddStatementToSurveyCommand(surveyId, statementId), cancelationToken);
            return Ok(survey);
        }

        [HttpPost("remove-statement/{surveyId:long}/{statementId:long}")]
        public async Task<IActionResult> RemoveStatementFromSurvey(long surveyId, long statementId)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var survey = await _mediator.Send(new RemoveStatementFromSurveyCommand(surveyId, statementId), cancelationToken);
            return Ok(survey);
        }
    }
}
