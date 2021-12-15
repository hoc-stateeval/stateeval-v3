using System.ComponentModel.DataAnnotations;

namespace SE.API.Controllers.Authentication
{
    public class LoginDTO
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Grant_type { get; set; }

        [Required]
        public string Client_id { get; set; }
    }
}
