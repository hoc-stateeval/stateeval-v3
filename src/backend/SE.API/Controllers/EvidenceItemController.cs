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

        [HttpGet("{evaluationId}/{collectionType}/{collectionObjectId}")]
        public async Task<IActionResult> GetEvidenceItemsForEvidenceCollection(
            long evaluationId, EvidenceCollectionType collectionType, long collectionObjectId)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var evidenceCollection = await _mediator.Send(
                new GetEvidenceItemsForEvidenceCollectionQuery(evaluationId, collectionType, collectionObjectId), 
                cancelationToken);
            return Ok(evidenceCollection);
        }

        [HttpPost("{evaluationId}/{collectionType}/{collectionObjectId}")]
        public async Task<IActionResult> CreateEvidenceItem(
            long evaluationId, EvidenceCollectionType collectionType, 
            long? collectionObjectId, 
            [FromBody] CreateEvidenceItemCommand command)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var dto = await _mediator.Send(command, cancelationToken);
            return Ok(dto);
        }
    }
}
