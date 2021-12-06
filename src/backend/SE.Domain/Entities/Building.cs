using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("Building")]
    public class Building : BaseEntity
    {
        [MaxLength(60)]
        [Required]
        public string DistrictName { get; set; }

        [MaxLength(20)]
        [Required]
        public string DistrictCode { get; set; }

        [MaxLength(60)]
        public string SchoolName { get; set; } = String.Empty;

        [MaxLength(20)]
        public string SchoolCode { get; set; } = String.Empty;
        public bool IsSchool { get; set; }
    }
}
