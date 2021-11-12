using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Data.Configuration
{
    public class FrameworkContextPrototypeConfig : BaseEntityConfig<FrameworkContextPrototype>
    {
        public FrameworkContextPrototypeConfig() : base("FrameworkContextPrototype")
        {
        }

        public override void Configure(EntityTypeBuilder<FrameworkContextPrototype> builder)
        {
            base.Configure(builder);

            builder.Property(obj => obj.Name).HasMaxLength(200).IsRequired();
            builder.Property(obj => obj.SchoolYear)
                        .HasConversion(new EnumToNumberConverter<SchoolYear, Int32>())
                        .IsRequired();
            builder.Property(obj => obj.EvaluationType)
                        .HasConversion(new EnumToNumberConverter<EvaluationType, Int32>())
                        .IsRequired();
            builder.Property(obj => obj.FrameworkTagName).HasMaxLength(20).IsRequired();

            builder
                .HasOne(x => x.StateFramework)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(x => x.InstructionalFramework)
                .WithMany()
                .IsRequired(false)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
