using SE.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SE.Data.Configuration
{
    public class BuildingConfig : BaseEntityConfig<Building>
    {
        public BuildingConfig() : base("Building")
        {
        }

        public override void Configure(EntityTypeBuilder<Building> builder)
        {
            base.Configure(builder);

            builder.Property(obj => obj.DistrictName).HasMaxLength(200).IsRequired();
            builder.Property(obj => obj.SchoolName).HasMaxLength(200).IsRequired();
            builder.Property(obj => obj.DistrictCode).HasMaxLength(10).IsRequired();
            builder.Property(obj => obj.SchoolCode).HasMaxLength(10).IsRequired();
            builder.Property(obj => obj.IsSchool).IsRequired();
        }
    }
}