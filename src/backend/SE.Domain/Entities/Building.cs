using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    public class Building : BaseEntity
    {
        public string DistrictName { get; }
        public string DistrictCode { get; }
        public string SchoolName { get; }
        public string SchoolCode { get; }
        public bool IsSchool { get; }
    }
}
