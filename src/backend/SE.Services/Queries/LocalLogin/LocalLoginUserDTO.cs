using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Queries.LocalLogin
{
    public class LocalLoginUserDTO
    {
        public long Id { get; set; }
        public string DisplayName { get; set; } = String.Empty;
        public string UserName { get; set; } = String.Empty;
        public string DistrictCode { get; set; } = String.Empty;
        public string SchoolCode { get; set; } = String.Empty;
        public string RoleName { get; set; } = String.Empty;
    }
}
