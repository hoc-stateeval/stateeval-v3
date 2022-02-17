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
    [Route("evidence-collections")]
    public class EvidenceCollectionController : ApiControllerBase
    {
        public EvidenceCollectionController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("ytd/{evaluationId:long}")]
        public async Task<IActionResult> GetYearToDateEvidenceCollection(long evaluationId)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var evidenceCollection = await _mediator.Send(new GetYearToDateEvidenceCollectionQuery(evaluationId), cancelationToken);
            return Ok(evidenceCollection);
        }
    }
}