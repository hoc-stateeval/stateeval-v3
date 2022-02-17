using MediatR;
using SE.API.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Queries;
using SE.Core.Queries.Frameworks;
using SE.Domain.Entities;
using SE.Core.Queries.Observations;
using SE.Core.Queries.EvidenceCollections;
using SE.Core.Commands.EvidenceCollections;

namespace SE.API.Controllers
{
    [Route("evidence-items")]
    public class EvidenceItemController : ApiControllerBase
    {
        public EvidenceItemController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("{evaluationId}")]
        public async Task<IActionResult> GetYearToDateEvidence(long evaluationId)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var items = await _mediator.Send(new GetYearToDateEvidenceItemsQuery(evaluationId), cancelationToken);
            return Ok(items);
        }

        [HttpPost("{collectionType}/{collectionObjectId}")]
        public async Task<IActionResult> CreateEvidenceItem(
            EvidenceCollectionType collectionType, 
            long collectionObjectId, 
            [FromBody] CreateEvidenceItemCommand command)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var dto = await _mediator.Send(command, cancelationToken);
            return Ok(dto);
        }
    }
}
