
using SE.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SE.Data.Configuration
{
    public class UserConfig : BaseEntityConfig<User>
    {
        public UserConfig() : base("User")
        {
        }

        public override void Configure(EntityTypeBuilder<User> builder)
        {
            base.Configure(builder);

            builder.Property(obj => obj.FirstName).HasMaxLength(50).IsRequired();
            builder.Property(obj => obj.LastName).HasMaxLength(50).IsRequired();
            builder.Property(obj => obj.LoginName).HasMaxLength(256).IsRequired(false);
            builder.Property(obj => obj.Email).HasMaxLength(256).IsRequired();
            builder.Property(obj => obj.UserName).HasMaxLength(256).IsRequired();
            builder.Property(obj => obj.Password).HasMaxLength(256).IsRequired();
            builder.Property(obj => obj.ProfileImageUrl).HasMaxLength(2048).IsRequired();

            builder
                .HasMany(x => x.WorkAreaContexts)
                .WithOne(x => x.User)
                .HasConstraintName("FK_User_WorkAreaContext_UserId")
                .IsRequired();
        }
    }
}