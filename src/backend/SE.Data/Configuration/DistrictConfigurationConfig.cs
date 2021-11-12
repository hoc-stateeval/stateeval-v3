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
    public class DistrictConfigurationConfig : BaseEntityConfig<DistrictConfiguration>
    {
        public DistrictConfigurationConfig() : base("DistrictConfiguration")
        {
        }

        public override void Configure(EntityTypeBuilder<DistrictConfiguration> builder)
        {
            base.Configure(builder);

            builder.Property(e => e.SummativeCriteriaStmtOfPerfRequired).IsRequired(false).HasDefaultValue(false);
            builder.Property(e => e.SummativeNextYearEvalCycleIsRequired).IsRequired(false).HasDefaultValue(false);
            builder.Property(e => e.SummativeEvaluationEnabled).IsRequired(false).HasDefaultValue(true);
            builder.Property(e => e.NonSummativeScoringEnabled).IsRequired(false).HasDefaultValue(true);
            builder.Property(e => e.CriticalAttributesEnabled).IsRequired(false).HasDefaultValue(false);
            builder.Property(e => e.CriticalAttributesReferenceOnly).IsRequired(false).HasDefaultValue(true);
            builder.Property(e => e.SummativeTorFinalRecIsRequired).IsRequired(false).HasDefaultValue(false);
            builder.Property(e => e.IsFinalReportConfigDelegated).IsRequired(false).HasDefaultValue(false);
            builder.Property(e => e.IsObsReportConfigDelegated).IsRequired(false).HasDefaultValue(false);
            builder.Property(e => e.IsSelfAssessReportConfigDelegated).IsRequired(false).HasDefaultValue(false);
            builder.Property(e => e.IsStudentGrowthReportConfigDelegated).IsRequired(false).HasDefaultValue(false);
            builder.Property(e => e.IsMidYearReportConfigDelegated).IsRequired(false).HasDefaultValue(false);
            builder.Property(e => e.AllowCollectedEvidenceSelectionInFinalReport).IsRequired(false).HasDefaultValue(false);
            builder.Property(e => e.AllowPackagedEvidenceSelectionInFinalReport).IsRequired(false).HasDefaultValue(false);
            builder.Property(e => e.AllowDownloadReportsSchoolAdmins).IsRequired(false).HasDefaultValue(true);
            builder.Property(e => e.ShowArchivedEvaluateeReports).IsRequired(false).HasDefaultValue(true);
            builder.Property(e => e.ReportArchivesPurged).IsRequired(false).HasDefaultValue(false);
            builder.Property(e => e.AssignedCalibrationExerciseSharingType).IsRequired(false).HasDefaultValue(CalibrationExerciseDistrictSharingType.SHARED_ANONYMOUS);
            builder.Property(e => e.DistrictAssignsCalibrationExercises).IsRequired(false).HasDefaultValue(false);
            builder.Property(e => e.AllowTeeYTDEvidence).IsRequired(false).HasDefaultValue(false);
            builder.Property(e => e.AllowFocusedComponentScoring).IsRequired(false).HasDefaultValue(false);

            builder.Property(e => e.SelfAssessmentsModuleEnabled).IsRequired(false).HasDefaultValue(true);
            builder.Property(e => e.CalibrationExercisesModuleEnabled).IsRequired(false).HasDefaultValue(false);
            builder.Property(e => e.ExemplarVideosModuleEnabled).IsRequired(false).HasDefaultValue(false);

            builder.Property(e => e.FinalReportTitle).HasMaxLength(200).IsRequired(false).HasDefaultValue("eVAL Summative Report");
            builder.Property(e => e.MidYearReportTitle).HasMaxLength(200).IsRequired(false).HasDefaultValue("eVAL Mid Year Report");
            builder.Property(e => e.ObservationReportTitle).HasMaxLength(200).IsRequired(false).HasDefaultValue("eVAL Observation Report");
            builder.Property(e => e.SelfAssessReportTitle).HasMaxLength(200).IsRequired(false).HasDefaultValue("eVAL Self Assessment Report");
            builder.Property(e => e.StudentGrowthGoalSettingReportTitle).HasMaxLength(200).IsRequired(false).HasDefaultValue("eVAL Student Growth Goal Setting Report");

            builder.Property(e => e.MidYearReportCustomText).IsRequired(false).HasDefaultValue("");
            builder.Property(e => e.FinalReportCustomText).IsRequired(false).HasDefaultValue("");
            builder.Property(e => e.ObservationReportCustomText).IsRequired(false).HasDefaultValue("");
            builder.Property(e => e.SelfAssessmentReportCustomText).IsRequired(false).HasDefaultValue("");
            builder.Property(e => e.StudentGrowthGoalSettingReportCustomText).IsRequired(false).HasDefaultValue("");
        }
    }
}
