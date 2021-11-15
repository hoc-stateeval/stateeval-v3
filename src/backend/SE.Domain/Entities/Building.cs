using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    public class Building : BaseEntity
    {
        [MaxLength(60)]
        [Required]
        public string DistrictName { get; set; }

        [MaxLength(20)]
        [Required]
        public string DistrictCode { get; set; }

        [MaxLength(60)]
        public string SchoolName { get; set; }

        [MaxLength(20)]
        public string SchoolCode { get; set; }
        public bool IsSchool { get; set; }
    }
}
