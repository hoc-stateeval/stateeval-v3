﻿using MediatR;
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

        [HttpGet("{evidenceCollectionType}/{evidenceCollectionObjectId}")]
        public async Task<IActionResult> GetEvidenceItemsForCollection(EvidenceCollectionType collectionType, long evidenceCollectionObjectId)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var items = await _mediator.Send(new GetEvidenceItemsForEvidenceCollectionQuery(collectionType, evidenceCollectionObjectId), cancelationToken);
            return Ok(items);
        }

        [HttpPost("{evidenceCollectionType}/{evidenceCollectionObjectId}")]
        public async Task<IActionResult> CreateEvidenceItem(
            EvidenceCollectionType collectionType, 
            long evidenceCollectionObjectId, 
            [FromBody] CreateEvidenceItemCommand command)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            await _mediator.Send(command, cancelationToken);
            return Ok(Unit.Value);
        }
    }
}
