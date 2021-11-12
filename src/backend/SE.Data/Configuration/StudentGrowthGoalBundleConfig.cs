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
    public class StudentGrowthGoalBundleConfig : BaseEntityConfig<StudentGrowthGoalBundle>
    {
        public StudentGrowthGoalBundleConfig() : base("StudentGrowthGoalBundle")
        {
        }

        public override void Configure(EntityTypeBuilder<StudentGrowthGoalBundle> builder)
        {
            base.Configure(builder);

            builder.Property(obj => obj.EvaluationType)
                .HasConversion(new EnumToNumberConverter<EvaluationType, Int32>())
                .IsRequired();
            builder.Property(obj => obj.WfState)
                .HasConversion(new EnumToNumberConverter<WfState, Int32>())
                .IsRequired();
            builder.Property(obj => obj.InRevision).IsRequired().HasDefaultValue(false);
            builder.Property(obj => obj.SharingDraft).IsRequired().HasDefaultValue(false);
            builder.Property(obj => obj.EvaluatorScoresShared).IsRequired().HasDefaultValue(false);
            builder.Property(obj => obj.EvaluateeEoyconfNotes).HasMaxLength(5000).IsRequired().HasDefaultValue("");
            builder.Property(obj => obj.EvaluateeMidConfNotes).HasMaxLength(5000).IsRequired().HasDefaultValue("");
            builder.Property(obj => obj.EvaluateeProcessConfNotes).HasMaxLength(5000).IsRequired().HasDefaultValue("");
            builder.Property(obj => obj.EvaluatorProcessConfNotes).HasMaxLength(5000).IsRequired().HasDefaultValue("");
            builder.Property(obj => obj.EvaluatorMidConfNotes).HasMaxLength(5000).IsRequired().HasDefaultValue("");
            builder.Property(obj => obj.EvaluatorEoyconfNotes).HasMaxLength(5000).IsRequired().HasDefaultValue("");
            builder
                .HasOne(x => x.Evaluatee)
                .WithMany()
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasMany(x => x.Goals)
                .WithOne(x => x.GoalBundle)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
