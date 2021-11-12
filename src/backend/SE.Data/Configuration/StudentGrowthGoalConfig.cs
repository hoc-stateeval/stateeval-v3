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
    public class StudentGrowthGoalConfig : BaseEntityConfig<StudentGrowthGoal>
    {
        public StudentGrowthGoalConfig() : base("StudentGrowthGoal")
        {
        }

        public override void Configure(EntityTypeBuilder<StudentGrowthGoal> builder)
        {
            base.Configure(builder);

            builder.Property(obj => obj.Title).HasMaxLength(200).IsRequired().HasDefaultValue("");
            builder.Property(obj => obj.Title).HasMaxLength(10000).IsRequired().HasDefaultValue("");
            builder.Property(obj => obj.IsActive).IsRequired().HasDefaultValue(false);
            builder.Property(obj => obj.CreationDateTime).IsRequired();

            builder
                .HasOne(x => x.Evaluatee)
                .WithMany()
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(x => x.Evaluation)
                .WithMany()
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(x => x.FrameworkNode)
                .WithMany()
                .IsRequired();

            builder
                .HasOne(x => x.GoalBundle)
                .WithMany()
                .IsRequired()
                .HasForeignKey(x => x.BundleId)
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(x => x.ProcessRubricRow)
                .WithMany()
                .IsRequired(false)
                .HasForeignKey(x => x.ProcessRubricRowId)
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(x => x.ResultsRubricRow)
                .WithMany()
                .IsRequired(false)
                .HasForeignKey(x => x.ResultsRubricRowId)
                .OnDelete(DeleteBehavior.NoAction);


        }
    }
}
