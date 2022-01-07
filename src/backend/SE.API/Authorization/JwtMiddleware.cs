using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using SE.Core.Services;
using System.Linq;
using System.Threading.Tasks;
using SE.Core.Common.Jwt;

namespace SE.API.Authorization
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly JwtSettings _jwtSettings;

        public JwtMiddleware(RequestDelegate next, IOptions<JwtSettings> jwtSettings)
        {
            _next = next;
            _jwtSettings = jwtSettings.Value;
        }

        public async Task Invoke(HttpContext context, IUserService userService, IJwtUtils jwtUtils)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var userId = jwtUtils.ValidateJwtToken(token);
            if (userId != null)
            {
                // attach user to context on successful jwt validation
                var user = await userService.GetUserById(userId.Value);
                context.Items["User"] = user;
            }

            await _next(context);
        }
    }
}