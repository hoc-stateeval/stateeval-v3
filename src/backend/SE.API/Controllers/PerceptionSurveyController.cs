using MediatR;
using SE.API.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Commands.PerceptionSurveys;
using SE.Core.Queries.PerceptionSurveys;
using SE.Core.Models;

namespace SE.API.Controllers
{
    [Route("perception-surveys")]
    public class PerceptionSurveyController : ApiControllerBase
    {
        public PerceptionSurveyController(IMediator mediator) : base(mediator)
        {
        }

        /// <summary>
        /// Gets the list of surveys associated with an evaluation.
        /// </summary>
        /// <param name="evaluationId">the evaluation id</param>
        /// <returns>
        ///     A list of PerceptionSurveyDTO objects
        /// </returns>
        [HttpGet("evaluation/{evaluationId:long}")]
        public async Task<ActionResult<List<PerceptionSurveyDTO>>> GetPerceptionSurveysForEvaluation(long evaluationId)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var surveys = await _mediator.Send(new GetPerceptionSurveysForEvaluationQuery(evaluationId), cancelationToken);
            return Ok(surveys);
        }

        /// <summary>
        ///     Gets the perception survey from its unique GUID
        /// </summary>
        /// <param name="guid">the unique GUID associated with the survey</param>
        /// <returns>
        ///     The PerceptionSurveyDTO object
        /// </returns>
        [HttpGet("{guid}")]
        public async Task<ActionResult<PerceptionSurveyDTO>> GetPerceptionSurveyByGuid(string guid)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var survey = await _mediator.Send(new GetPerceptionSurveyByGuidQuery(guid), cancelationToken);
            return Ok(survey);
        }

        /// <summary>
        ///     Updates the survey
        /// </summary>
        /// <param name="surveyId">survey Id</param>
        /// <param name="command">The UpdatePerceptionSurveyCommand object for specifying the fields to update.</param>
        /// <returns>
        ///     No value.
        /// </returns>
        [HttpPut("{id:long}")]
        public async Task<ActionResult<Unit>> UpdatePerceptionSurvey(long surveyId, [FromBody] UpdatePerceptionSurveyCommand command)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            await _mediator.Send(command, cancelationToken);
            return Ok(Unit.Value);
        }

        /// <summary>
        /// Creates a new perception survey object
        /// </summary>
        /// <param name="evaluationId">the evaluation id to associate the survey with</param>
        /// <param name="command">the command object for specifying the survey data</param>
        /// <returns>
        ///     A PerceptionSurveyDTO object
        /// </returns>

        [HttpPost("evaluation/{evaluationId:long}")]
        public async Task<ActionResult<PerceptionSurveyDTO>> Create(long evaluationId, [FromBody] CreatePerceptionSurveyCommand command)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            return Ok(await _mediator.Send(command, cancelationToken));
        }

        /// <summary>
        /// Add a PerceptionSurveyStatement to a PerceptionSurvey
        /// </summary>
        /// <param name="surveyId">The survey id</param>
        /// <param name="statementId">The survey statement id</param>
        /// <returns>
        ///     No value.
        /// </returns>
        [HttpPost("add-statement/{surveyId:long}/{statementId:long}")]
        public async Task<ActionResult<Unit>> AddStatementToSurvey(long surveyId, long statementId)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var survey = await _mediator.Send(new AddStatementToSurveyCommand(surveyId, statementId), cancelationToken);
            return Ok(survey);
        }

        /// <summary>
        ///     Removes a PerceptionSurveyStatement from a PerceptionSurvey
        /// </summary>
        /// <param name="surveyId">The survey id</param>
        /// <param name="statementId">The survey statement id</param>
        /// <returns>
        ///     No value.
        /// </returns>
        [HttpPost("remove-statement/{surveyId:long}/{statementId:long}")]
        public async Task<ActionResult<Unit>> RemoveStatementFromSurvey(long surveyId, long statementId)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var survey = await _mediator.Send(new RemoveStatementFromSurveyCommand(surveyId, statementId), cancelationToken);
            return Ok(survey);
        }

        /// <summary>
        /// Deletes the PerceptionSurvey
        /// </summary>
        /// <param name="surveyId">the survey id </param>
        /// <returns>
        ///     No value.
        /// </returns>
        [HttpDelete("{surveyId:long}")]
        public async Task<ActionResult<Unit>> DeleteSurvey(long surveyId)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var result = await _mediator.Send(new DeleteSurveyCommand(surveyId), cancelationToken);
            return Unit.Value;
        }
    }
}
