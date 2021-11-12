using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SE.Domain.Entities;

namespace SE.Data.Configuration
{
    public class UserLocationRoleConfig : BaseEntityConfig<UserBuildingRole>
    {
        public UserLocationRoleConfig() : base("UserBuildingRole") { }

        public override void Configure(EntityTypeBuilder<UserBuildingRole> builder)
        {
            base.Configure(builder);

            builder
                .HasOne(x => x.Role)
                .WithMany()
                .IsRequired()
                .HasForeignKey(x => x.RoleId)
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(x => x.Building)
                .WithMany()
                .HasForeignKey(x => x.BuildingId)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(x => x.User)
                .WithMany(x => x.UserBuildingRoles)
                .HasForeignKey(x => x.UserId)
                .IsRequired()
                .HasConstraintName("FK_UserBuildingRole_User_UserId");
        }
    }
}
