using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class AuthenticatedUserDTO
    {
        public UserDTO User { get; set; }
        public long DefaultWorkAreaContextId;
        public AuthenticatedTokensDTO Tokens { get; set; }
    }
}
