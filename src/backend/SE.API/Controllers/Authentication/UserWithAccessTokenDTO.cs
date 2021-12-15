using SE.Core.Models;

namespace SE.API.Controllers.Authentication
{
    public class UserWithAccessTokenDTO
    {
        public UserDTO User { get; set; }
        public string AccessToken { get; set; }
    }
}
