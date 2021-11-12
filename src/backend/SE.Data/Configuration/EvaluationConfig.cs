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
    public class EvaluationConfig : BaseEntityConfig<Evaluation>
    {
        public EvaluationConfig() : base("Evaluation")
        {
        }

        public override void Configure(EntityTypeBuilder<Evaluation> builder)
        {
            base.Configure(builder);

            builder.Property(obj => obj.IsActive).IsRequired();
            builder.Property(obj => obj.DeactivateMessage).HasMaxLength(200).HasDefaultValue("");

            builder.Property(obj => obj.DistrictCode).HasMaxLength(20).IsRequired();
            builder.Property(obj => obj.SchoolCode).HasMaxLength(20).IsRequired().HasDefaultValue("");
            builder.Property(obj => obj.SchoolYear)
                .HasConversion(new EnumToNumberConverter<SchoolYear, Int32>())
                .IsRequired();
            builder.Property(obj => obj.EvaluationType)
                .HasConversion(new EnumToNumberConverter<EvaluationType, Int32>())
                .IsRequired();
            builder.Property(obj => obj.WfState)
                .HasConversion(new EnumToNumberConverter<WfState, Int32>())
                .IsRequired().HasDefaultValue(WfState.EVAL_DRAFT);
            builder.Property(obj => obj.PerformanceLevel)
                .HasConversion(new EnumToNumberConverter<RubricPerformanceLevel, Int32>())
                .IsRequired(false).HasDefaultValue(RubricPerformanceLevel.UNDEFINED);
            builder.Property(obj => obj.StudentGrowthImpactRating)
                .HasConversion(new EnumToNumberConverter<StudentGrowthImpactRating, Int32>())
                .IsRequired(false).HasDefaultValue(StudentGrowthImpactRating.UNDEFINED);
            builder.Property(obj => obj.ComprehensiveCarryForward)
                .IsRequired(false).HasDefaultValue(false);
            builder.Property(obj => obj.ComprehensiveCarryForwardPerformanceLevel)
                .HasConversion(new EnumToNumberConverter<RubricPerformanceLevel, Int32>())
                .IsRequired(false).HasDefaultValue(RubricPerformanceLevel.UNDEFINED);
            builder.Property(obj => obj.ComprehensiveCarryForwardSchoolYear)
                .HasConversion(new EnumToNumberConverter<SchoolYear, Int32>())
                .IsRequired(false);
            builder.Property(obj => obj.EvaluateePlanType)
                .HasConversion(new EnumToNumberConverter<EvaluateePlanType, Int32>())
                .IsRequired(false).HasDefaultValue(EvaluateePlanType.UNDEFINED);
            builder.Property(obj => obj.LastYearEvaluateePlanType)
                .HasConversion(new EnumToNumberConverter<EvaluateePlanType, Int32>())
                .IsRequired(false).HasDefaultValue(EvaluateePlanType.UNDEFINED);
            builder.Property(obj => obj.NextYearEvaluateePlanType)
                .HasConversion(new EnumToNumberConverter<EvaluateePlanType, Int32>())
                .IsRequired(false).HasDefaultValue(EvaluateePlanType.UNDEFINED);
            builder.Property(obj => obj.SuggestedEvaluateePlanType)
                .HasConversion(new EnumToNumberConverter<EvaluateePlanType, Int32>())
                .IsRequired(false).HasDefaultValue(EvaluateePlanType.UNDEFINED);
            builder.Property(obj => obj.LastYearFocusedFrameworkNodeShortName).HasMaxLength(20).IsRequired(false).HasDefaultValue("");
            builder.Property(obj => obj.LastYearFocusedSGframeworkNodeShortName).HasMaxLength(20).IsRequired(false).HasDefaultValue("");
            builder.Property(obj => obj.SuggestedFocusedFrameworkNodeShortName).HasMaxLength(20).IsRequired(false).HasDefaultValue("");
            builder.Property(obj => obj.SuggestedFocusedSgframeworkNodeShortName).HasMaxLength(20).IsRequired(false).HasDefaultValue("");

            builder.Property(obj => obj.Complete).IsRequired(false).HasDefaultValue(false);
            builder.Property(obj => obj.ByPassSGScores).IsRequired(false).HasDefaultValue(false);
            builder.Property(obj => obj.ByPassReceipt).IsRequired(false).HasDefaultValue(false);
            builder.Property(obj => obj.DropToPaper).IsRequired(false).HasDefaultValue(false);
            builder.Property(obj => obj.AutoSubmitAfterReceipt).IsRequired(false).HasDefaultValue(false);
            builder.Property(obj => obj.EvaluateeReflectionsIsPublic).IsRequired(false).HasDefaultValue(false);
            builder.Property(obj => obj.MidYearReportsShared).IsRequired(false).HasDefaultValue(false);
            builder.Property(obj => obj.EvaluatorScoresShared).IsRequired(false).HasDefaultValue(false);
            builder.Property(obj => obj.FinalReportShared).IsRequired(false).HasDefaultValue(false);
            builder.Property(obj => obj.SelfEvalComplete).IsRequired(false).HasDefaultValue(false);
            builder.Property(obj => obj.SelfEvalShared).IsRequired(false).HasDefaultValue(false);
            builder.Property(obj => obj.VisibleToEvaluatee).IsRequired(false).HasDefaultValue(false);

            builder.Property(obj => obj.SGScoreOverrideComment).HasMaxLength(2048).IsRequired(false).HasDefaultValue("");
            builder.Property(obj => obj.ByPassReceiptOverrideComment).HasMaxLength(2048).IsRequired(false).HasDefaultValue("");
            builder.Property(obj => obj.DropToPaperOverrideComment).HasMaxLength(2048).IsRequired(false).HasDefaultValue("");
            builder.Property(obj => obj.EvaluateeReflections).HasMaxLength(5000).IsRequired(false).HasDefaultValue("");
            builder.Property(obj => obj.EvaluatorRecommendations).HasMaxLength(5000).IsRequired(false).HasDefaultValue("");

            builder
                .HasOne(x => x.Evaluator)
                .WithMany()
                .HasForeignKey(x => x.EvaluatorId)
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(x => x.Evaluatee)
                .WithMany()
                .HasForeignKey(x => x.EvaluateeId)
                .OnDelete(DeleteBehavior.NoAction);

            builder
                 .HasOne(x => x.FocusedFrameworkNode)
                 .WithMany()
                 .HasForeignKey(x => x.FocusedFrameworkNodeId)
                 .OnDelete(DeleteBehavior.NoAction);

            builder
                 .HasOne(x => x.FocusedSGFrameworkNode)
                 .WithMany()
                 .HasForeignKey(x => x.FocusedSGFrameworkNodeId)
                 .OnDelete(DeleteBehavior.NoAction);

            builder
                 .HasOne(x => x.ModifiedCompFocusedFrameworkNode2)
                 .WithMany()
                 .OnDelete(DeleteBehavior.NoAction);

            builder
                 .HasOne(x => x.NextYearFocusedFrameworkNode)
                 .WithMany()
                 .OnDelete(DeleteBehavior.NoAction);

            builder
                 .HasOne(x => x.NextYearFocusedSGframeworkNode)
                 .WithMany();

        }
    }
}
