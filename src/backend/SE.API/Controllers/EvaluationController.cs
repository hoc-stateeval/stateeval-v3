using MediatR;
using SE.API.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Commands;
using SE.Core.Queries;
using SE.Domain.Entities;
using SE.Core.Commands.Evaluations;
using SE.Core.Queries.Evaluations;
using SE.Core.Models;

namespace SE.API.Controllers
{
    [Route("evaluations")]
    public class EvaluationController : ApiControllerBase
    {
        public EvaluationController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EvaluationSummaryDTO>> GetEvaluationById(long id)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var evaluation = await _mediator.Send(new GetEvaluationByIdQuery(id), cancelationToken);
            return Ok(evaluation);
        }

        [HttpGet("historical/{userId}")]
        public async Task<ActionResult<List<EvaluationSummaryDTO>>> GetHistoricalEvaluationsForUser(long userId)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var evaluation = await _mediator.Send(new GetHistoricalEvaluationsForUserQuery(userId), cancelationToken);
            return Ok(evaluation);
        }

        [HttpPut("{id}/update-plan-type")]
        public async Task<ActionResult<EvaluationSummaryDTO>> UpdateEvaluateePlanType(long id, [FromBody] UpdateEvaluateePlanTypeCommand command)
        {
            if (id != command.EvaluationId)
            {
                return BadRequest();
            }
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var result = await _mediator.Send(command, cancelationToken);
            var evaluation = await _mediator.Send(new GetEvaluationByIdQuery(id), cancelationToken);
            return Ok(evaluation);
        }

        [HttpPut("{id}/update-evaluator")]
        public async Task<ActionResult<EvaluationSummaryDTO>> UpdateEvaluator(long id, [FromBody] UpdateEvaluatorCommand command)
        {
            if (id != command.EvaluationId)
            {
                return BadRequest();
            }
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var result = await _mediator.Send(command, cancelationToken);
            var evaluation = await _mediator.Send(new GetEvaluationByIdQuery(id), cancelationToken);
            return Ok(evaluation);
        }

        [HttpGet("work-area-context/{workAreaContextId}")]
        public async Task<ActionResult<List<EvaluationSummaryDTO>>> GetEvaluationsForWorkAreaContext(long workAreaContextId)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var evaluations = await _mediator.Send(new GetEvaluationsForWorkAreaContextQuery(workAreaContextId), cancelationToken);
            return Ok(evaluations);
        }

        [HttpGet("{frameworkContextId}/{evaluatorId}")]
        public async Task<ActionResult<List<EvaluationSummaryDTO>>> GetEvaluationsForEvaluator(long frameworkContextId, long evaluatorId)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var evaluations = await _mediator.Send(new GetEvaluationsForEvaluatorQuery(frameworkContextId, evaluatorId), cancelationToken);
            return Ok(evaluations);
        }

        [HttpGet("{frameworkContextId}/{schoolCode}")]
        public async Task<ActionResult<List<EvaluationSummaryDTO>>> GetEvaluationsForSchool(long frameworkContextId, string schoolCode)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var evaluations = await _mediator.Send(new GetEvaluationsForSchoolQuery(frameworkContextId, schoolCode), cancelationToken);
            return Ok(evaluations);
        }

        [HttpGet("{frameworkContextId}/{evaluatorId}/{schoolCode?}")]
        public async Task<ActionResult<List<EvaluationSummaryDTO>>> GetEvaluationsForDistrictViewer(long frameworkContextId, long evaluatorId, string schoolCode)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var users = await _mediator.Send(new GetEvaluationsForDistrictViewerQuery(frameworkContextId, evaluatorId, schoolCode), cancelationToken);
            return Ok(users);
        }
    }
}
