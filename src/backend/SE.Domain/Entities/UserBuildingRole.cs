﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    public class UserBuildingRole : BaseEntity
    {
        public long UserId { get; set; }
        public virtual User User { get; set; }
        public long BuildingId { get; set; }
        public virtual Building Building { get; set; }
        public long RoleId { get; set; }
        public virtual Role Role { get; set; }
    }
}
