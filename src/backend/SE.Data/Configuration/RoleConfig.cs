using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using SE.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SE.Data.Configuration
{
    public class RoleConfig : BaseEntityConfig<Role>
    {
        public RoleConfig() : base("Role")
        {
        }

        public override void Configure(EntityTypeBuilder<Role> builder)
        {
            base.Configure(builder);

            builder.Property(obj => obj.EDSName).HasMaxLength(256).IsRequired();

            builder.Property(obj => obj.DisplayName).HasMaxLength(256).IsRequired();
        }
    }
}
