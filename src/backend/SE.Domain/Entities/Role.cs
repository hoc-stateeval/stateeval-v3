using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    public class Role : BaseEntity
    {
        [MaxLength(256)]
        [Required]
        public string EDSName { get; set; }

        [MaxLength(256)]
        [Required]
        public string DisplayName { get; set; }
    }
}
