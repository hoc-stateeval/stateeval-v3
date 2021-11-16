using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    public enum EvidenceCollectionScoreType
    {
        RR = 1,
        FN
    }

    public enum RoleType
    {
        DA = 1,
        DAM,
        SPS_CT_TR,
        DE,
        DV,
        DTE,
        SA,
        HEAD_PR,
        PR,
        TR
    }

    public enum WorkAreaType
    {
        UNDEFINED = 0,
        DA_TR,
        DA_PR,
        DA_CT_SPS,
        DTE,
        DE,
        DV,
        DAM_TR,
        DAM_PR,
        PR_TR,
        PR_PR,
        TR_ME,
        PR_ME,
        CT_SPS,
        SA_TR,
        SA_PR
    }

    public enum SchoolYear
    {
        SY_2013 = 2013,
        SY_2014,
        SY_2015,
        SY_2016,
        SY_2017,
        SY_2018,
        SY_2019,
        SY_2020,
        SY_2021
    }

    public enum StudentGrowthImpactRating
    {
        UNDEFINED = 0,
        LOW = 1,
        AVERAGE,
        HIGH
    }

    public enum ResourceType
    {
        UNDEFINED = 0,
        IMPORTANT_DOCS,
        TRAINING_MANUALS,
        VIDEOS
    }

    public enum UserPromptType
    {
        UNDEFINED = 0,
        PRE_CONFERENCE,
        POST_CONFERENCE,
        STUDENT_GROWTH_GOAL,
        SUMMATIVE
    }

    public enum ReportType
    {
        UNDEFINED = 0,
        SUMMATIVE,
        OBSERVATION,
        SELF_ASSESSMENT,
        DISCREPANCY,
        MID_YEAR,
        STUDENT_GROWTH_GOAL_SETTING
    }

    public enum CalibrationExerciseDistrictSharingType
    {
        UNDEFINED = 0,
        PRIVATE,
        SHARED_FULL,
        SHARED_ANONYMOUS
    }

    public enum WfState
    {
        UNDEFINED = 0,
        EVAL_DRAFT = 1,

        /* obsolete */
        EVAL_READY_FOR_CONFERENCE = 2,
        EVAL_READY_FOR_FORMAL_RECEIPT = 3,
        EVAL_RECEIVED = 4,
        /* end obsolete */

        EVAL_LOCKED_SEALED = 5,
        OBS_IN_PROGRESS_TOR = 6,
        OBS_LOCKED_TEE_REVIEW = 7,
        OBS_LOCKED_SEALED = 8,
        OBS_UNLOCK_REQUEST_TOR = 9,
        OBS_UNLOCK_REQUEST_TEE = 10,
        SGBUNDLE_STARTED = 11,
        SGBUNDLE_PROCESS_SHARED = 12,
        SGBUNDLE_PROCESS_COMPLETE = 13,
        SGBUNDLE_UNLOCK_REQUEST_TEE = 14,
        EVAL_UNLOCK_REQUEST_TOR = 15,
        EVAL_UNLOCK_REQUEST_TEE = 16,
        SGBUNDLE_UNLOCK_REQUEST_TOR = 17,
        PERCEPTION_SURVEY_BUILDING = 18,
        PERCEPTION_SURVEY_CLOSED = 19,
        PERCEPTION_SURVEY_OPEN = 20,
        PERCEPTION_SURVEY_COMPLETE = 21
    }

    public enum EvaluateePlanType
    {
        UNDEFINED = 0,
        COMPREHENSIVE,
        FOCUSED,
        MODIFIED_COMP_2021
    }

    public enum RubricPerformanceLevel
    {
        UNDEFINED = 0,
        PL1,
        PL2,
        PL3,
        PL4
    }

    public enum EvaluationType
    {
        PRINCIPAL = 1,
        TEACHER,
        LIBRARIAN,
        TEACHER_CT_SPS
    }

    public enum FrameworkViewType
    {
        STATE_ONLY = 1,
        STATE_DEFAULT,
        INSTR_DEFAULT,
        INSTR_ONLY
    }

    public enum DbCustomization
    {
        NONE = 0,
        TEST,
        SANDBOX,
        DEMO,
        STAGING,
        SPS_SANDBOX,
        SPS_DEMO
    }
    public enum EvidenceCollectionType
    {
        UNDEFINED = 0,
        OTHER_EVIDENCE = 1,
        OBSERVATION = 2,
        SELF_ASSESSMENT = 3,
        STUDENT_GROWTH_GOALS = 4,
        SUMMATIVE = 5,
        /* obsolete
        LEARNING_WALK_OBS,
        LEARNING_WALK_SUMMATIVE,
        PRACTICE_SESSION_OBS,
        PRACTICE_SESSION_SUMMATIVE,
        */
        YEAR_TO_DATE = 10,
        CALIBRATION_EXERCISE = 11
    }

    public enum EvidenceType
    {
        UNDEFINED = 0,
        ARTIFACT,
        RR_ANNOTATION_OBSERVATION_NOTES,
        RR_ANNOTATION_PRECONF_PROMPT,
        RR_ANNOTATION_TOR_PRECONF_SUMMARY,
        RR_ANNOTATION_POSTCONF_PROMPT,
        RR_ANNOTATION_TOR_POSTCONF_SUMMARY,
        STUDENT_GROWTH_GOAL,
        RR_ANNOTATION_TEE_PRECONF_SUMMARY,
        RR_ANNOTATION_TEE_POSTCONF_SUMMARY,
        RR_ANNOTATION_RUBRIC_NOTE,
        STUDENT_GROWTH_GOAL_PROMPT,
        TRAINING_EVIDENCE_SEGMENT,
        RR_ANNOTATION_SUMMATIVE_PROMPT
    }

    static public class EnumUtils
    {
        public static SchoolYear CurrentSchoolYear = SchoolYear.SY_2021;

        public static string GetCurrentSchoolYearDisplayName()
        {
            var currentSchoolYear = Convert.ToInt32(EnumUtils.CurrentSchoolYear);

            return $"{Convert.ToString(currentSchoolYear - 1)} - {Convert.ToString(currentSchoolYear)}";

        }

        public static string MapEvaluationTypeToEvaluateeTerm(EvaluationType evaluationType)
        {
            var evaluateeTerm = evaluationType switch
            {
                EvaluationType.TEACHER => "Teacher",
                EvaluationType.PRINCIPAL => "Principal",
                EvaluationType.TEACHER_CT_SPS => "Teacher",
                _ => "",
            };

            return evaluateeTerm;
        }

        public static string MapEvaluationTypeToEvaluatorTerm(EvaluationType evaluationType)
        {
            var evaluatorTerm = evaluationType switch
            {
                EvaluationType.TEACHER => "Evaluator",
                EvaluationType.PRINCIPAL => "Evaluator",
                EvaluationType.TEACHER_CT_SPS => "CT",
                _ => "",
            };

            return evaluatorTerm;
        }

        public static RoleType MapEvaluationTypeToEvaluateeRole(EvaluationType evaluationType)
        {
            var roleType = evaluationType switch
            {
                EvaluationType.TEACHER => RoleType.TR,
                EvaluationType.PRINCIPAL => RoleType.PR,
                EvaluationType.TEACHER_CT_SPS => RoleType.TR,
                _ => throw new NotImplementedException($"MapEvaluationTypeToRole: Unknown mapping: {evaluationType}")
            };

            return roleType;
        }


        public static string MapWorkAreaTypeToTagName(WorkAreaType wa)
        {
            var tagName = wa switch
            {
                WorkAreaType.DA_TR => "DA_TR",
                WorkAreaType.DAM_TR => "DAM_TR",
                WorkAreaType.DAM_PR => "DAM_PR",
                WorkAreaType.DA_PR => "DA_PR",
                WorkAreaType.DA_CT_SPS => "DA_CT_SPS",
                WorkAreaType.DTE => "DTE",
                WorkAreaType.DE => "DE",
                WorkAreaType.DV => "DV",
                WorkAreaType.PR_TR => "PR_TR",
                WorkAreaType.PR_PR => "PR_PR",
                WorkAreaType.TR_ME => "TR_ME",
                WorkAreaType.PR_ME => "PR_ME",
                WorkAreaType.CT_SPS => "CT_SPS",
                WorkAreaType.SA_TR => "SA_TR",
                WorkAreaType.SA_PR => "SA_PR",
                _ => throw new Exception($"MapWorkAreaTypeToTagName: Unknown mapping: {wa}")
            };

            return tagName;
        }

        public static string MapRoleTypeToDisplayName(RoleType role)
        {
            var roleString = role switch
            {
                RoleType.DA => "District Admin",
                RoleType.DAM => "District Assignment Manager",
                RoleType.DE => "District Evaluator",
                RoleType.DV => "District Viewer",
                RoleType.DTE => "District-wide Teacher Evaluator",
                RoleType.SA => "School Admin",
                RoleType.HEAD_PR => "Head Principal",
                RoleType.PR => "Principal",
                RoleType.TR => "Teacher",
                RoleType.SPS_CT_TR => "Consulting Teacher",
                _ => throw new Exception($"MapRoleEnumToDisplayName: Unknown mapping: {role}")
            };
            return roleString;
        }

        public static string MapWfStateToDisplayName(WfState wfState, string evaluatorRoleName, string evaluateeRoleName)
        {
            var displayName = wfState switch
            {
                WfState.EVAL_DRAFT => "Draft",
                WfState.EVAL_LOCKED_SEALED => "Locked/Sealed",
                WfState.EVAL_READY_FOR_FORMAL_RECEIPT => "Ready For Review",
                WfState.EVAL_RECEIVED => "Received",
                WfState.EVAL_UNLOCK_REQUEST_TEE => $"Unlock Request from {evaluateeRoleName}",
                WfState.EVAL_UNLOCK_REQUEST_TOR => $"Unlock Request from {evaluatorRoleName}",
                WfState.OBS_IN_PROGRESS_TOR => "In Progress",
                WfState.OBS_LOCKED_SEALED => "Locked/Sealed",
                WfState.OBS_LOCKED_TEE_REVIEW => $"{evaluateeRoleName} Review",
                WfState.OBS_UNLOCK_REQUEST_TEE => $"Unlock Request from {evaluateeRoleName}",
                WfState.OBS_UNLOCK_REQUEST_TOR => $"Unlock Request from {evaluatorRoleName}",
                WfState.PERCEPTION_SURVEY_BUILDING => "Building",
                WfState.PERCEPTION_SURVEY_CLOSED => "Closed",
                WfState.PERCEPTION_SURVEY_COMPLETE => "Complete",
                WfState.PERCEPTION_SURVEY_OPEN => "Open",
                WfState.SGBUNDLE_PROCESS_COMPLETE => "Complete",
                WfState.SGBUNDLE_PROCESS_SHARED => "Shared",
                WfState.SGBUNDLE_STARTED => "In Progress",
                WfState.SGBUNDLE_UNLOCK_REQUEST_TEE => $"Unlock Request from {evaluateeRoleName}",
                WfState.SGBUNDLE_UNLOCK_REQUEST_TOR => $"Unlock Request from {evaluatorRoleName}",
                _ => throw new Exception($"MapWfStateToDisplayName: Unknown mapping: {wfState}")
            };

            return displayName;
        }
        public static string MapEvaluateePlanTypeToDisplayName(EvaluateePlanType? planType)
        {
            var displayName = planType switch
            {
                EvaluateePlanType.COMPREHENSIVE => "Comprehensive",
                EvaluateePlanType.FOCUSED => "Focused",
                EvaluateePlanType.MODIFIED_COMP_2021 => "Modified Comprehensive",
                EvaluateePlanType.UNDEFINED => "Unassigned",
                _ => throw new Exception($"MapEvaluateePlanTypeToDisplayName: Unknown mapping: {planType}")
            };
            return displayName;
        }
    }
}
