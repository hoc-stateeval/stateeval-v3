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

        [HttpGet]
        [Route("{districtcode}")]
        public async Task<IActionResult> GetDistrictById(string districtcode)
        {
            throw new NotImplementedException();
            //var evaluation = await _mediator.Send(new GetEvaluationByIdQuery(id));
            //return Ok(evaluation);
        }

        [HttpGet]
        [Route("{districtcode}/schools")]
        public async Task<IActionResult> GetSchoolsInDistrict(string districtcode)
        {
            throw new NotImplementedException();
            //var evaluation = await _mediator.Send(new GetEvaluationByIdQuery(id));
            //return Ok(evaluation);
        }

        [HttpGet]
        [Route("{districtCode}/schools/{schoolCode}/evauations/{evaluationType}")]
        public async Task<IActionResult> GetEvaluationsInSchool(string districtCode, string schoolCode, EvaluationType evaluationType)
        {
            var evaluations = await _mediator.Send(new GetEvaluationsForSchoolQuery(districtCode, schoolCode, evaluationType));
            return Ok(evaluations);
        }
    }
}
