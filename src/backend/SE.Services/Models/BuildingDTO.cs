using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    /// <summary>
    /// A physical building, which is either a school or a district. 
    /// When IsSchool is true, the DistrictName, DistrictCode, SchoolName, and SchoolCode will all be populated.
    /// When IsSchool is false, the SchoolName and SchoolCode will be empty.
    /// When it is a school,
    /// </summary>
    public class BuildingDTO
    {
        public long Id { get; set; }
        /// <summary>
        /// Whether the building is a school or a district
        /// </summary>
        public bool IsSchool { get; set; }
        /// <summary>
        /// The OSPI name of the school, if IsSchool is true, otherwise an empty string.
        /// </summary>
        public string SchoolName { get; set; } = string.Empty;
        /// <summary>
        /// The unique OSPI code for the school, if IsSchool is true, otherwise an empty string.
        /// </summary>
        public string SchoolCode { get; set; } = string.Empty;
        /// <summary>
        /// The unique OSPI code for the district
        /// </summary>
        public string DistrictCode { get; set; } = string.Empty;
        /// <summary>
        /// The OSPI name for the district
        /// </summary>
        public string DistrictName { get; set; } = string.Empty;
    }
}
