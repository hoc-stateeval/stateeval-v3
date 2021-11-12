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
    public class WorkAreaConfig : BaseEntityConfig<WorkArea>
    {
        public WorkAreaConfig() : base("WorkArea")
        {
        }

        public override void Configure(EntityTypeBuilder<WorkArea> builder)
        {
            base.Configure(builder);

            builder.Property(obj => obj.TagName).HasMaxLength(20).IsRequired();
            builder.Property(obj => obj.Title).HasMaxLength(256).IsRequired();
            builder.Property(obj => obj.Priority).IsRequired();
            builder.Property(obj => obj.IsEvaluatee).IsRequired(true);
            builder.Property(obj => obj.IsEvaluator).IsRequired(true);
            builder.Property(obj => obj.IsDistrictAdmin).IsRequired(true);
            builder.Property(obj => obj.IsSchoolAdmin).IsRequired(true);
            builder.Property(obj => obj.EvaluationType)
                    .HasConversion(new EnumToNumberConverter<EvaluationType, Int32>())
                    .IsRequired();

            builder
                .HasOne(r => r.Role)
                .WithMany()
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(r => r.EvaluateeRole)
                .WithMany()
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
