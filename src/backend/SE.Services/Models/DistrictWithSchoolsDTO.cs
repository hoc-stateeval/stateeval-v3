using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class DistrictWithSchoolsDTO
    {
        public long Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public string DistrictCode { get; set; } = String.Empty;
        public List<SchoolDTO> Schools { get; set; } = new List<SchoolDTO>();
    }
}
