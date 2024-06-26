﻿
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SE.Core.Commands;
using SE.Core.Queries;
using SE.Domain.Entities;
using SE.API.Authorization;
using SE.Core.Commands.Authentication;
using SE.Core.Queries.Users;
using SE.Core.Queries.Evaluators;
using SE.Core.Models;

namespace SE.API.Controllers
{
    [Route("users")]
    //[Authorize]
    public class UserController : ApiControllerBase
    {
        public UserController(IMediator mediator) : base(mediator)
        {
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<ActionResult<AuthenticatedUserDTO>> Authenticate([FromBody] LoginUserCommand command)
        {
            command.IPAddress = ipAddress();
            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var authenticatedUser = await _mediator.Send(command, cancelationToken);
            setTokenCookie(authenticatedUser.Tokens.RefreshToken);
            return Ok(authenticatedUser);
        }

        [AllowAnonymous]
        [HttpPost("refresh-token")]
        public async Task<ActionResult<AuthenticatedTokensDTO>> RefreshToken([FromBody] RefreshTokenCommand command)
        {
            //  Request.Cookies["refreshToken"];

            command.IPAddress = ipAddress();

            CancellationToken cancelationToken = HttpContext.RequestAborted;
            var authenticatedUserTokensDTO = await _mediator.Send(command, cancelationToken);
            return Ok(authenticatedUserTokensDTO);
        }

        [HttpPost("revoke-token")]
        public async Task<IActionResult> RevokeToken([FromBody] LogoutUserCommand command, CancellationToken cancellationToken)
        {
            // accept refresh token in request body or cookie
            string token = null;
            if (String.IsNullOrEmpty(command.Token))
                token = Request.Cookies["refreshToken"]; ;

            if (string.IsNullOrEmpty(command.Token))
                return BadRequest(new { message = "Token is required" });

            RevokeTokenCommand revokeCommand = new RevokeTokenCommand(token, ipAddress()); 

            CancellationToken cancelationToken = HttpContext.RequestAborted;
            await _mediator.Send(revokeCommand, cancelationToken);
            return Ok(new { message = "Token revoked" });
        }

        //[Authorize]
        [HttpGet("{username}")]
        public async Task<ActionResult<UserDTO>> GetUserByUserName(string username)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var user = await _mediator.Send(new GetUserByUserNameQuery(username), cancelationToken);
            return Ok(user);
        }

        [HttpGet("district/{districtCode}/users-in-role/{roleType}")]
        public async Task<ActionResult<List<UserDTO>>> GetUsersInRoleAtDistrict(string districtCode, RoleType roleType)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var users = await _mediator.Send(new GetUsersInRoleAtDistrictQuery(districtCode, roleType), cancelationToken);
            return Ok(users);
        }

        [HttpGet("school/{schoolCode}/users-in-role/{roleType}")]
        public async Task<ActionResult<List<UserDTO>>> GetUsersInRoleInSchool(string schoolCode, RoleType roleType)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var users = await _mediator.Send(new GetUsersInRoleInSchoolQuery(schoolCode, roleType), cancelationToken);
            return Ok(users);
        }

        [HttpGet("{districtCode}/users-in-role-in-schools/{roleType}")]
        public async Task<ActionResult<List<UserDTO>>> GetUsersInRoleInSchools(string districtCode, RoleType roleType)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var users = await _mediator.Send(new GetUsersInRoleInSchoolsQuery(districtCode, roleType), cancelationToken);
            return Ok(users);
        }

        [HttpGet("{workAreaContextId}/evaluators-for-district-viewer/{schoolCode?}")]
        public async Task<ActionResult<List<UserDTO>>> GetEvaluatorsForDistrictViewer(long workAreaContextId, string schoolCode)
        {
            CancellationToken cancelationToken =  HttpContext.RequestAborted;
            var users = await _mediator.Send(new GetEvaluatorsForDistrictViewerQuery(workAreaContextId, schoolCode), cancelationToken);
            return Ok(users);
        }

        private void setTokenCookie(string token)
        {
            // append cookie with refresh token to the http response
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("refreshToken", token, cookieOptions);
        }

        private string ipAddress()
        {
            // get source ip address for the current request
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
            {
                return Request.Headers["X-Forwarded-For"];
            }
            else
            {
                try
                {
                    return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
                }
                catch (Exception ex)
                {
                    return "";
                }
            }
        }
    }
}

