using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SE.Core.Queries;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace SE.API.Controllers.Authentication
{
    [Route("auth")]
    public class AuthController : ApiControllerBase
    {
        private IConfiguration _config;

        public AuthController(IMediator mediator, IConfiguration config)
            : base(mediator)
        {
            _config = config;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            if (loginDTO == null || string.IsNullOrEmpty(loginDTO.UserName) || string.IsNullOrEmpty(loginDTO.Password))
                return BadRequest();

            var result = await AuthenticateUser(loginDTO);
            return result;
        }

        private string GenerateJSONWebToken(LoginDTO userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              null,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        protected async Task<IActionResult> AuthenticateUser(LoginDTO loginDTO)
        {
            var user = await _mediator.Send(new GetUserByUserNameQuery(loginDTO.UserName));
            if (user != null && user.Id > 0)
            {
                if (await CheckPasswordAsync(user.UserName, loginDTO.Password))
                {
                    var token = GenerateJSONWebToken(loginDTO);
                    return Ok(token);
                }
            }

            return Unauthorized();
        }

        protected async Task<bool> CheckPasswordAsync(string username, string password)
        {
            // TODO
            return await Task.FromResult(true);
        }

        [HttpGet(nameof(Get))]
        public async Task<IEnumerable<string>> Get()
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");

            return new string[] { accessToken };
        }

    }
}
