using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SE.Domain.Entities;

namespace SE.Data.Configuration
{
    public class FrameworkNodeConfig : BaseEntityConfig<FrameworkNode>
    {
        public FrameworkNodeConfig() : base("FrameworkNode")
        {
        }

        public override void Configure(EntityTypeBuilder<FrameworkNode> builder)
        {
            base.Configure(builder);

            builder.Property(obj => obj.ShortName).HasMaxLength(50).IsRequired();
            builder.Property(obj => obj.Title).HasMaxLength(600).IsRequired();
            builder.Property(obj => obj.FrameworkTagName).HasMaxLength(20).IsRequired();
            builder.Property(obj => obj.IsStudentGrowthAligned).IsRequired();
            builder.Property(obj => obj.Sequence).IsRequired();
            builder.Property(obj => obj.SchoolYear)
                .HasConversion(new EnumToNumberConverter<SchoolYear, Int32>())
                .IsRequired();

            builder
                .HasOne(x => x.Framework)
                .WithMany(x => x.FrameworkNodes)
                .IsRequired();
        }
    }
}
