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
    [Route("evidence-packages")]
    public class EvidencePackagesController : ApiControllerBase
    {
        public EvidencePackagesController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("{evaluationId}")]
        public async Task<IActionResult> GetYearToDatePacakages(long evaluationId)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var items = await _mediator.Send(new GetYearToDateEvidencePackagesQuery(evaluationId), cancelationToken);
            return Ok(items);
        }

        [HttpPost("{evaluationId}")]
        public async Task<IActionResult> CreateEvidencePackage(
            EvidenceCollectionType collectionType, 
            long collectionObjectId, 
            [FromBody] CreateEvidencePackageCommand command)
        {
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            await _mediator.Send(command, cancelationToken);
            return Ok(Unit.Value);
        }
    }
}
