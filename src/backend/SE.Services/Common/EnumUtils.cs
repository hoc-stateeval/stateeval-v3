using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Common
{
    public static class EnumUtils
    {
        public static SchoolYear CurrentSchoolYear = SchoolYear.SY_2021;

        public static string GetCurrentSchoolYearDisplayName()
        {
            return GetSchoolYearDisplayName(EnumUtils.CurrentSchoolYear);
        }

        public static string GetSchoolYearDisplayName(SchoolYear schoolYear)
        {
            return $"{Convert.ToString(Convert.ToInt32(schoolYear) - 1)} - {Convert.ToString(Convert.ToInt32(schoolYear))}";
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

        public static string EvaluationTypeDisplayName(EvaluationType evaluationType)
        {
            var displayName = evaluationType switch
            {
                EvaluationType.TEACHER => "Teacher",
                EvaluationType.PRINCIPAL => "Principal",
                EvaluationType.TEACHER_CT_SPS => "Teacher (CT)",
                _ => throw new NotImplementedException($"EvaluationTypeDisplayName: Unknown evalType: {evaluationType}")
            };

            return displayName;
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
                WorkAreaType.DV_PR_TR => "DV_PR_TR",
                WorkAreaType.DV_PR_PR => "DV_PR_PR",
                WorkAreaType.DV_DTE => "DV_DTE",
                WorkAreaType.DV_DE => "DV_DE",
                WorkAreaType.DV_CT => "DV_CT",
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

        public static string MapWfStateToDisplayName(WfState wfState, string evaluateeTerm)
        {
            var displayName = wfState switch
            {
                WfState.EVAL_DRAFT => "Draft",
                WfState.EVAL_LOCKED_SEALED => "Locked/Sealed",
                WfState.EVAL_READY_FOR_FORMAL_RECEIPT => "Ready For Review",
                WfState.EVAL_RECEIVED => "Received",
                WfState.EVAL_UNLOCK_REQUEST_TEE => $"Unlock Request from {evaluateeTerm}",
                WfState.EVAL_UNLOCK_REQUEST_TOR => $"Unlock Request from Evaluator",
                WfState.OBS_IN_PROGRESS_TOR => "In Progress",
                WfState.OBS_LOCKED_SEALED => "Locked/Sealed",
                WfState.OBS_LOCKED_TEE_REVIEW => $"{evaluateeTerm} Review",
                WfState.OBS_UNLOCK_REQUEST_TEE => $"Unlock Request from {evaluateeTerm}",
                WfState.OBS_UNLOCK_REQUEST_TOR => $"Unlock Request from Evalutor",
                WfState.PERCEPTION_SURVEY_BUILDING => "Building",
                WfState.PERCEPTION_SURVEY_CLOSED => "Closed",
                WfState.PERCEPTION_SURVEY_COMPLETE => "Complete",
                WfState.PERCEPTION_SURVEY_OPEN => "Open",
                WfState.SGBUNDLE_PROCESS_COMPLETE => "Complete",
                WfState.SGBUNDLE_PROCESS_SHARED => "Shared",
                WfState.SGBUNDLE_STARTED => "In Progress",
                WfState.SGBUNDLE_UNLOCK_REQUEST_TEE => $"Unlock Request from Evaluatee",
                WfState.SGBUNDLE_UNLOCK_REQUEST_TOR => $"Unlock Request from Evaluator",
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
                EvaluateePlanType.UNDEFINED => "N/A",
                null => "N/A",
                _ => throw new Exception($"MapEvaluateePlanTypeToDisplayName: Unknown mapping: {planType}")
            };
            return displayName;
        }

        public static string MapPerformanceLevelToDisplayName(RubricPerformanceLevel? performanceLevel)
        {
            var displayName = performanceLevel switch
            {
                RubricPerformanceLevel.PL4 => "DIS",
                RubricPerformanceLevel.PL3 => "PRO",
                RubricPerformanceLevel.PL2 => "BAS",
                RubricPerformanceLevel.PL1 => "UNS",
                RubricPerformanceLevel.UNDEFINED => "N/A",
                null => "N/A",
                _ => throw new Exception($"MapPerformanceLevelToDIsplayName: Unknown mapping: {performanceLevel}")
            };
            return displayName;
        }

        public static string MapEvidenceTypeToDisplayName(EvidenceType evidenceType)
        {
            var displayName = evidenceType switch
            {
                EvidenceType.RUBRIC_ROW_NOTE => "Rubric Component Note",
                EvidenceType.UNDEFINED => "N/A",
                EvidenceType.ARTIFACT => "Artifact",
                EvidenceType.ARTIFACT_CODED_NOTES => "Artifact Coded Note",
                EvidenceType.OBSERVATION_CODED_NOTES => "Observation Coded Note",
                EvidenceType.OBSERVATION_CODED_POSTCONF_PROMPT_RESPONSE => "Observation Coded Post Conf Prompt Ressponse",
                _ => throw new Exception($"MapEvidenceTypeToDisplayName: Unknown mapping: {evidenceType}")
            };
            return displayName;
        }

        public static bool AggregateCollection(EvidenceCollectionType collectionType)
        {
            return (collectionType == EvidenceCollectionType.YEAR_TO_DATE ||
                    collectionType == EvidenceCollectionType.SUMMATIVE);
        }
        public static string MapEvidenceCollectionTypeToDisplayName(EvidencePackage evidencePackage)
        {
            var displayName = evidencePackage.EvidenceCollectionType switch
            {
                EvidenceCollectionType.OTHER_EVIDENCE => "Other Evidence",
                EvidenceCollectionType.YEAR_TO_DATE => "Year to Date",
                EvidenceCollectionType.UNDEFINED => "N/A",
                EvidenceCollectionType.SUMMATIVE => "Summative",
                //EvidenceCollectionType.YEAR_TO_DATE => "Year to Date",
                EvidenceCollectionType.OBSERVATION => $"Observation - {evidencePackage.Observation.Title}",
                //  EvidenceCollectionType.SELF_ASSESSMENT => $"Self Assessment - {evidencePackage.SelfAssessment.Title}",
                EvidenceCollectionType.STUDENT_GROWTH => "Student Growth",
                _ => throw new Exception($"MapEvidenceCollectionTypeToDisplayName: Unknown mapping: {evidencePackage.EvidenceCollectionType}")
            };
            return displayName;
        }

        public static string MapEvidenceCollectionTypeToDisplayName(EvidenceItem evidenceItem)
        {
            var displayName = evidenceItem.EvidenceCollectionType switch
            {
                EvidenceCollectionType.OTHER_EVIDENCE => "Other Evidence",
                EvidenceCollectionType.YEAR_TO_DATE => "Year to Date",
                EvidenceCollectionType.UNDEFINED => "N/A",
                EvidenceCollectionType.SUMMATIVE => "Summative",
                //EvidenceCollectionType.YEAR_TO_DATE => "Year to Date",
                EvidenceCollectionType.OBSERVATION => $"Observation - {evidenceItem.Observation.Title}",
              //  EvidenceCollectionType.SELF_ASSESSMENT => $"Self Assessment - {evidenceItem.SelfAssessment.Title}",
                EvidenceCollectionType.STUDENT_GROWTH => "Student Growth",
                _ => throw new Exception($"MapEvidenceCollectionTypeToDisplayName: Unknown mapping: {evidenceItem.EvidenceCollectionType}")
            };
            return displayName;
        }
    }
}
