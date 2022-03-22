using MediatR;
using SE.API.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Commands.PerceptionSurveys;
using SE.Core.Queries.PerceptionSurveys;
using SE.Core.Models;

namespace SE.API.Controllers
{
    [Route("perception-survey-statements")]
    public class PerceptionSurveyStatementController : ApiControllerBase
    {
        public PerceptionSurveyStatementController(IMediator mediator) : base(mediator)
        {
        }

        /// <summary>
        ///     Get the statements that are associated with a particular instructional framework.
        /// </summary>
        /// <param name="tagName">the instructional framework tagname</param>
        /// <returns>
        ///     A list of PerceptionSurveyStatemntDTO objects
        /// </returns>
        [HttpGet("by-tagname/{tagName}")]
        public async Task<ActionResult<List<PerceptionSurveyResponseDTO>>> GetPerceptionSurveyStatementForFrameworkTagName(string tagName)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var survey = await _mediator.Send(new GetPerceptionSurveyStatementsForFrameworkTagNameQuery(tagName), cancelationToken);
            return Ok(survey);
        }


        /// <summary>
        ///     Get the statements that have been associated with the survey
        /// </summary>
        /// <param name="surveyId">the survey id</param>
        /// <returns>
        ///     A list of PerceptionSurveyStatemntDTO objects
        /// </returns>
        [HttpGet("{surveyId:long}")]
        public async Task<ActionResult<List<PerceptionSurveyResponseDTO>>> GetPerceptionSurveyStatementsForSurvey(long surveyId)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var statements = await _mediator.Send(new GetPerceptionSurveyStatementsQuery(surveyId), cancelationToken);
            return Ok(statements);
        }

        /// <summary>
        ///     Gets a list of the statement ids that have been selected to be used with the survey.
        /// </summary>
        /// <param name="surveyId">the survey id</param>
        /// <returns>
        ///     A list of statement ids
        /// </returns>
        [HttpGet("{surveyId}/statementIds")]
        public async Task<ActionResult<List<long>>> GetPerceptionSurveyStatementIds(long surveyId)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var survey = await _mediator.Send(new GetPerceptionSurveyStatementsIdsQuery(surveyId), cancelationToken);
            return Ok(survey);
        }
    }
}
