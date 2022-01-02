using SE.Core.Models;

namespace SE.API.Controllers.Authentication
{
    public class AuthenticatedUserDTO
    {
        public UserDTO User { get; set; }
        public List<WorkAreaContextDTO> WorkAreaContexts;
        public long DefaultWorkAreaContextId;
        public string AccessToken { get; set; }
    }
}
