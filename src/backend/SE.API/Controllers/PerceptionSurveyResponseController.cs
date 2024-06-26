﻿using MediatR;
using SE.API.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Commands.PerceptionSurveys;
using SE.Core.Queries.PerceptionSurveys;
using SE.Core.Models;

namespace SE.API.Controllers
{
    [Route("perception-survey-responses")]
    public class PerceptionSurveyResponseController : ApiControllerBase
    {
        public PerceptionSurveyResponseController(IMediator mediator) : base(mediator)
        {
        }

        /// <summary>
        ///     Gets a responses associated with the survey.
        /// </summary>
        /// <param name="surveyId">the survey id</param>
        /// <returns>
        ///     A list of PerceptionSurveyResponseDTO objects
        /// </returns>
        [HttpGet("{surveyId}")]
        public async Task<ActionResult<List<PerceptionSurveyResponseDTO>>> GetPerceptionSurveyResponses(long surveyId)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var responses = await _mediator.Send(new GetPerceptionSurveyResponsesQuery(surveyId), cancelationToken);
            return Ok(responses);
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
