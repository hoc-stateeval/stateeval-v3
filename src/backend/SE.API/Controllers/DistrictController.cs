using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Queries;
using SE.Domain.Entities;
using SE.Services.Queries;

namespace SE.API.Controllers
{
    [Route("districts")]
    [AllowAnonymous]
    public class DistrictController : ApiControllerBase
    {
        public DistrictController(IMediator mediator) : base(mediator)
        {
        }

        [HttpGet("{districtcode}")]
        public async Task<IActionResult> GetDistrictById(string districtcode)
        {
            throw new NotImplementedException();
            //var evaluation = await _mediator.Send(new GetEvaluationByIdQuery(id));
            //return Ok(evaluation);
        }

        [HttpGet("{districtcode}/schools")]
        public async Task<IActionResult> GetSchoolsInDistrict(string districtcode)
        {
            throw new NotImplementedException();
            //var evaluation = await _mediator.Send(new GetEvaluationByIdQuery(id));
            //return Ok(evaluation);
        }

        [HttpGet("{districtCode}/schools/{schoolCode}/evaluations/{evaluationType}")]
        public async Task<IActionResult> GetEvaluationsForSchool(string districtCode, string schoolCode, int evaluationType)
        {
            var evaluations = await _mediator.Send(new GetEvaluationsForSchoolQuery(districtCode, schoolCode, (EvaluationType)evaluationType));
            return Ok(evaluations);
        }
    }
}
