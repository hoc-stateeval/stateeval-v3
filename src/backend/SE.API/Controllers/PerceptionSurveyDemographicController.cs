using MediatR;
using SE.API.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Commands.PerceptionSurveys;
using SE.Core.Queries.PerceptionSurveys;
using SE.Core.Models;

namespace SE.API.Controllers
{
    [Route("perception-survey-demographics")]
    public class PerceptionSurveyDemographicController : ApiControllerBase
    {
        public PerceptionSurveyDemographicController(IMediator mediator) : base(mediator)
        {
        }

        /// <summary>
        ///     Gets a demographic data associated with the survey.
        /// </summary>
        /// <param name="surveyId">the survey id</param>
        /// <returns>
        ///     A collection of PerceptionSurveyDemographicDTO objects
        /// </returns>
        [HttpGet("{surveyId}")]
        public async Task<ActionResult<List<PerceptionSurveyDemographicDTO>>> GetPerceptionSurveyDemographics(long surveyId)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var demographics = await _mediator.Send(new GetPerceptionSurveyDemographicsQuery(surveyId), cancelationToken);
            return Ok(demographics);
        }

        /// <summary>
        /// Submits all of the responses and demographic data for a survey.
        /// </summary>
        /// <param name="surveyId">the survey id</param>
        /// <param name="command">the command containing the responses and demographic data</param>
        /// <returns>No content</returns>
        [HttpPost("{surveyId}")] 
        public async Task<ActionResult> SubmitPerceptionSurveyResponses(long surveyId, SubmitSurveyResponsesCommand command)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            await _mediator.Send(command, cancelationToken);
            return Ok(NoContent());
        }
    }
}
