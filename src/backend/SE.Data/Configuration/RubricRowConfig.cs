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
    public class RubricRowConfig : BaseEntityConfig<RubricRow>
    {
        public RubricRowConfig() : base("RubricRow")
        {
        }

        public override void Configure(EntityTypeBuilder<RubricRow> builder)
        {
            base.Configure(builder);

            builder.Property(obj => obj.ShortName).HasMaxLength(50).IsRequired();
            builder.Property(obj => obj.Title).HasMaxLength(600).IsRequired();
            builder.Property(obj => obj.Description).HasMaxLength(2048).IsRequired();
            builder.Property(obj => obj.PL1Descriptor).HasMaxLength(2048).IsRequired();
            builder.Property(obj => obj.PL2Descriptor).HasMaxLength(2048).IsRequired();
            builder.Property(obj => obj.PL3Descriptor).HasMaxLength(2048).IsRequired();
            builder.Property(obj => obj.PL4Descriptor).HasMaxLength(2048).IsRequired();
            builder.Property(obj => obj.LookFor1).HasMaxLength(2048);
            builder.Property(obj => obj.LookFor2).HasMaxLength(2048);
            builder.Property(obj => obj.LookFor3).HasMaxLength(2048);
            builder.Property(obj => obj.LookFor4).HasMaxLength(2048);
            builder.Property(obj => obj.FrameworkTagName).HasMaxLength(20).IsRequired();
            builder.Property(obj => obj.IsStudentGrowthAligned).IsRequired();
            builder.Property(obj => obj.SchoolYear)
                .HasConversion(new EnumToNumberConverter<SchoolYear, Int32>())
                .IsRequired();
        }
    }
}
