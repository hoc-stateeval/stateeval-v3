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
    public class FrameworkContextConfig : BaseEntityConfig<FrameworkContext>
    {
        public FrameworkContextConfig() : base("FrameworkContext")
        {
        }

        public override void Configure(EntityTypeBuilder<FrameworkContext> builder)
        {
            base.Configure(builder);

            builder.Property(obj => obj.Name).HasMaxLength(200).IsRequired();
            builder.Property(obj => obj.DistrictCode).HasMaxLength(20).IsRequired();
            builder.Property(obj => obj.LoadDateTime).IsRequired();
            builder.Property(obj => obj.SchoolYear)
                        .HasConversion(new EnumToNumberConverter<SchoolYear, Int32>())
                        .IsRequired();
            builder.Property(obj => obj.EvaluationType)
                        .HasConversion(new EnumToNumberConverter<EvaluationType, Int32>())
                        .IsRequired();
            builder.Property(obj => obj.FrameworkTagName).HasMaxLength(20).IsRequired();
            builder.Property(obj => obj.FrameworkViewType)
                        .HasConversion(new EnumToNumberConverter<FrameworkViewType, Int32>())
                        .IsRequired();

            builder
                .HasOne(x => x.StateFramework)
                .WithMany()
                .IsRequired()
                .HasForeignKey(x => x.StateFrameworkId)
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(x => x.InstructionalFramework)
                .WithMany()
                .HasForeignKey(x => x.InstructionalFrameworkId)
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(x => x.DefaultFramework)
                .WithMany()
                .IsRequired()
                .HasForeignKey(x => x.DefaultFrameworkId)
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(x => x.PrototypeFrameworkContext)
                .WithMany()
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(x => x.DistrictConfiguration)
                .WithOne(x => x.FrameworkContext)
                .IsRequired()
                .HasForeignKey<DistrictConfiguration>(x => x.FrameworkContextId)
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasMany(x => x.SchoolConfigurations)
                .WithOne(x => x.FrameworkContext)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
