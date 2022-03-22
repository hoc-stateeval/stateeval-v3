using MediatR;
using SE.API.Authorization;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Queries.LocalLogin;
using SE.Domain.Entities;
using SE.Core.Models;

namespace SE.API.Controllers
{

    [Route("local-login")]
    public class LocalLoginController : ApiControllerBase
    {
        public LocalLoginController(IMediator mediator) : base(mediator)
        {
        }

        /// <summary>
        /// Used for populating the sandbox local login screen with sample districts/schools.
        /// </summary>
        /// <returns>
        ///     A list of DistrictWithSchoolsDTO objects
        /// </returns>
        [HttpGet]
        [Route("districts")]
        [AllowAnonymous]
        public async Task<ActionResult<List<DistrictWithSchoolsDTO>>> GetDistricts()
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var districts = await _mediator.Send(new GetLocalLoginDistrictsQuery(), cancelationToken);
            return Ok(districts);
        }

        /// <summary>
        ///  Used for getting a list of sandbox user accounts for populating the local login screen.   
        /// </summary>
        /// <param name="districtCode">the unique OSPI district code</param>
        /// <returns>
        ///     A list of LocalLoginUserDTO objects
        /// </returns>
        [HttpGet]
        [Route("users/{districtCode}")]
        [AllowAnonymous]
        public async Task<ActionResult<List<LocalLoginUserDTO>>> GetUsers(string districtCode)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var users = await _mediator.Send(new GetLocalLoginUsersInDistrictQuery(districtCode), cancelationToken);
            return Ok(users);
        }
    }
}
