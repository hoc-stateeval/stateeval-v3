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
    public class FrameworkConfig : BaseEntityConfig<Framework>
    {
        public FrameworkConfig() : base("Framework")
        {
        }

        public override void Configure(EntityTypeBuilder<Framework> builder)
        {
            base.Configure(builder);

            builder.Property(obj => obj.Name).HasMaxLength(200).IsRequired();
            builder.Property(obj => obj.FrameworkTagName).HasMaxLength(20).IsRequired();
            builder.Property(obj => obj.SchoolYear)
                        .HasConversion(new EnumToNumberConverter<SchoolYear, Int32>())
                        .IsRequired();

            builder
                .HasMany(x => x.FrameworkNodes)
                .WithOne(x => x.Framework)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
