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
        public async Task<IActionResult> GetSchoolsInDistrict(string districtCode)
        {
            var schools = await _mediator.Send(new GetSchoolsInDistrictQuery(districtCode));
            return Ok(schools);
        }

        // TODO: move to EvaluationController
        [HttpGet("{frameworkContextId}/{schoolCode}/evaluations")]
        public async Task<IActionResult> GetEvaluationsForSchool(long frameworkContextId, string schoolCode)
        {
            var evaluations = await _mediator.Send(new GetEvaluationsForSchoolQuery(frameworkContextId, schoolCode));
            return Ok(evaluations);
        }

        [HttpGet("{districtCode}/usersinrole/{roleType}")]
        public async Task<IActionResult> GetUsersInRoleAtDistrict(string districtCode, RoleType roleType)
        {
            var users = await _mediator.Send(new GetUsersInRoleAtDistrictQuery(districtCode, roleType));
            return Ok(users);
        }

        [HttpGet("{districtCode}/usersinrole/{schoolCode}/{roleType}")]
        public async Task<IActionResult> GetUsersInRoleInSchool(string districtCode, string schoolCode, RoleType roleType)
        {
            var users = await _mediator.Send(new GetUsersInRoleInSchoolQuery(districtCode, schoolCode, roleType));
            return Ok(users);
        }

        [HttpGet("{districtCode}/usersinroleinschools/{roleType}")]
        public async Task<IActionResult> GetUsersInRoleInSchools(string districtCode, RoleType roleType)
        {
            var users = await _mediator.Send(new GetUsersInRoleInSchoolsQuery(districtCode, roleType));
            return Ok(users);
        }

    }
}
