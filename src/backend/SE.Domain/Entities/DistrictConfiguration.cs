using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("DistrictConfiguration")]
    public class DistrictConfiguration : BaseEntity
    {
        public string FinalReportTitle { get; set; }
        public string FinalReportCustomText { get; set; }
        public bool AllowCollectedEvidenceSelectionInFinalReport { get; set; }
        public bool AllowPackagedEvidenceSelectionInFinalReport { get; set; }
        public bool IsFinalReportConfigDelegated { get; set; }


        public string MidYearReportTitle { get; set; }
        public string MidYearReportCustomText { get; set; }
        public bool IsMidYearReportConfigDelegated { get; set; }


        public string StudentGrowthGoalSettingReportTitle { get; set; }
        public string StudentGrowthGoalSettingReportCustomText { get; set; }
        public bool IsStudentGrowthReportConfigDelegated { get; set; }


        public string ObservationReportTitle { get; set; }
        public string ObservationReportCustomText { get; set; }
        public bool IsObsReportConfigDelegated { get; set; }

        public bool SelfAssessmentsModuleEnabled { get; set; }
        public string SelfAssessReportTitle { get; set; }
        public string SelfAssessmentReportCustomText { get; set; }
        public bool IsSelfAssessReportConfigDelegated { get; set; }


        public bool SummativeCriteriaStmtOfPerfRequired { get; set; }
        public bool SummativeNextYearEvalCycleIsRequired { get; set; }
        public bool SummativeTorFinalRecIsRequired { get; set; }

        public bool SummativeEvaluationEnabled { get; set; }
        public bool NonSummativeScoringEnabled { get; set; }
        public bool CriticalAttributesEnabled { get; set; }
        public bool CriticalAttributesReferenceOnly { get; set; }

        public bool AllowDownloadReportsSchoolAdmins { get; set; }
        public bool ShowArchivedEvaluateeReports { get; set; }
        public bool ReportArchivesPurged { get; set; }
        public bool AllowTeeYTDEvidence { get; set; }
        public bool AllowFocusedComponentScoring { get; set; }


        public CalibrationExerciseDistrictSharingType AssignedCalibrationExerciseSharingType { get; set; }
        public bool DistrictAssignsCalibrationExercises { get; set; }
        public bool CalibrationExercisesModuleEnabled { get; set; }

        public bool ExemplarVideosModuleEnabled { get; set; }


        [ForeignKey("FrameworkContext")]
        public long FrameworkContextId { get; set; }

        [Required]
        public virtual FrameworkContext FrameworkContext { get; set; }
    }
}
