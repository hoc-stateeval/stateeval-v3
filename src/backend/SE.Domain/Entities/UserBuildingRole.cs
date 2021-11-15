using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    public class UserBuildingRole : BaseEntity
    {
        [ForeignKey("User")]
        public long UserId { get; set; }

        [Required]
        public virtual User User { get; set; }


        [ForeignKey("Building")]
        public long BuildingId { get; set; }

        [Required]
        public virtual Building Building { get; set; }


        [ForeignKey("Role")]
        public long RoleId { get; set; }

        [Required]
        public virtual Role Role { get; set; }
    }
}
