import { lazy } from 'react'

import { WorkArea } from '@lib/enums';
import { adminPaths, evaluationPaths, trainingPaths, districtViewerPaths } from '@routes/paths';

/*
 * Training Routes Setup
 */
const TrainingDashboard = lazy(() => import('@training/Dashboard'));
const TrainingBercVideos = lazy(() => import('@training/videos/berc/Dashboard'));
const TrainingNationalBoardVideos = lazy(() => import('@training/videos/national-board/Dashboard'));

const trainingRoutes = [
  {
    path: trainingPaths.root,
    element: <TrainingDashboard/>
  },
  {
    path: trainingPaths.bercVideos,
    element: <TrainingBercVideos/>
  },
  {
    path: trainingPaths.nationalBoardVideos,
    element: <TrainingNationalBoardVideos/>
  },
];

/*
 * Admin Routes Setup
 */
const DistrictAdminTeacherDashboard = lazy(() => import('@admin/dashboards/da-tr/Dashboard'));
const DistrictAdminPrincipalDashboard = lazy(() => import('@admin/dashboards/da-pr/Dashboard'));
const SchoolAdminTeacherDashboard = lazy(() => import('@admin/dashboards/sa-tr/Dashboard'));
const SchoolAdminPrincipalDashboard = lazy(() => import('@admin/dashboards/sa-pr/Dashboard'));
const AssignmentsDistrictSummary = lazy(() => import('@admin/assignments/AssignmentsDistrictSummary'));
const AssignmentsDistrictDetail = lazy(() => import('@admin/assignments/AssignmentsDistrictDetail'));
const AssignmentsSchoolDetail = lazy(() => import('@admin/assignments/AssignmentsSchoolDetail'));
const PromptBankDashboard = lazy(() => import('@admin/prompt-bank/Dashboard'));
const DteSetup = lazy(() => import('@admin/dte-setup/Dashboard'));
const DvSetup = lazy(() => import('@admin/dv-setup/Dashboard'));
const AdminGeneralSettingsDashboard = lazy(() => import('@admin/settings/general/Dashboard'));
const AdminReportSettingsDashboard = lazy(() => import('@admin/settings/reports/Dashboard'));
const AdminResourcesDashboard = lazy(() => import('@admin/resources/Dashboard'));
const AdminReportsDashboard = lazy(() => import('@admin/reports/Dashboard'));

const adminPromptBankRoute = {
  path: adminPaths.promptBankRoot,
  element: <PromptBankDashboard/>
};

const adminResourcesRoute = {
  path: adminPaths.resources,
  element: <AdminResourcesDashboard/>
};

const adminReportsRoute =  {
  path: adminPaths.reports,
  element: <AdminReportsDashboard/>
};

const adminGeneralSettingsRoute = {
  path: adminPaths.settingsGeneral,
  element: <AdminGeneralSettingsDashboard/>
};

const adminReportSettingsRoute =   {
  path: adminPaths.settingsReports,
  element: <AdminReportSettingsDashboard/>
};


/*
 * Evaluation Routes Setup
 */
const ArtifactsDashboard = lazy(() => import('@evaluation/artifacts/Dashboard'));
const StudentGrowthDashboard = lazy(() => import('@evaluation/student-growth/Dashboard'));
const YearToDateDashboard = lazy(() => import('@evaluation/ytd/Dashboard'));
const PrTrDashboard = lazy(() => import('@evaluation/dashboards/pr-tr/Dashboard'));
const PrPrDashboard = lazy(() => import('@evaluation/dashboards/pr-pr/Dashboard'));
const DteDashboard = lazy(() => import('@evaluation/dashboards/dte/Dashboard'));
const DeDashboard = lazy(() => import('@evaluation/dashboards/de/Dashboard'));
const CtDashboard = lazy(() => import('@evaluation/dashboards/ct/Dashboard'));
const PrMeDashboard = lazy(() => import('@evaluation/dashboards/pr-me/Dashboard'));
const TrMeDashboard = lazy(() => import('@evaluation/dashboards/tr-me/Dashboard'));
const DvPrPrDashboard = lazy(() => import('@district-viewer/dashboards/dv-pr-pr/Dashboard'));
const DvPrTrDashboard = lazy(() => import('@district-viewer/dashboards/dv-pr-tr/Dashboard'));
const DvCtDashboard = lazy(() => import('@district-viewer/dashboards/dv-ct/Dashboard'));
const DvDeDashboard = lazy(() => import('@district-viewer/dashboards/dv-de/Dashboard'));
const DvDteDashboard = lazy(() => import('@district-viewer/dashboards/dv-dte/Dashboard'));
const ObservationsDashboard = lazy(() => import('@evaluation/observations/Dashboard'));
const SelfAssessmentsDashboard = lazy(() => import('@evaluation/self-assessments/Dashboard'));
const SummativeEvalDashboard = lazy(() => import('@evaluation/summative-eval/Dashboard'));
const MidYearEvalDashboard = lazy(() => import('@evaluation/mid-year-eval/Dashboard'));
const EvaluationResourcesDashboard = lazy(() => import('@evaluation/resources/Dashboard'));
const EvaluationReportArchivesDashboard = lazy(() => import('@evaluation/report-archives/Dashboard'));

const evaluationSharedRoutes = {
  artifacts:  {
    path: evaluationPaths.artifacts,
    element: <ArtifactsDashboard/>
  },
  ytdEvidence: {
    path: evaluationPaths.ytdEvidence,
    element: <YearToDateDashboard/>
  },
  studentGrowth: {
    path: evaluationPaths.studentGrowth,
    element: <StudentGrowthDashboard/>
  },
  observations: {
    path: evaluationPaths.observations,
    element: <ObservationsDashboard/>
  },
  selfAssessments: {
    path: evaluationPaths.selfAssessments,
    element: <SelfAssessmentsDashboard/>
  },
  midYearEvaluation: {
    path: evaluationPaths.midYearEvaluation,
    element: <MidYearEvalDashboard/>
  },
  summativeEvaluation: {
    path: evaluationPaths.summativeEvaluation,
    element: <SummativeEvalDashboard/>
  },
  settingsAssignments: {
    path: evaluationPaths.settingsAssignments,
    element: <SummativeEvalDashboard/>
  },
  reportArchives: {
    path: evaluationPaths.reportArchives,
    element: <EvaluationReportArchivesDashboard/>
  },
  resources: {
    path: evaluationPaths.resources,
    element: <EvaluationResourcesDashboard/>
  }
}


const evaluationRoutes_coreRoutes = [
  evaluationSharedRoutes.artifacts,
  evaluationSharedRoutes.ytdEvidence,
  evaluationSharedRoutes.studentGrowth,
  evaluationSharedRoutes.observations,
  evaluationSharedRoutes.selfAssessments,
  evaluationSharedRoutes.midYearEvaluation,
  evaluationSharedRoutes.summativeEvaluation,
  evaluationSharedRoutes.reportArchives,
  evaluationSharedRoutes.resources,
];

/*
 * Exported Routes 
 */

const adminRoutes_DA_PR = {
  workAreaTag: WorkArea.DA_PR,
  routes: [
    {
      path: adminPaths.daPrDashboard,
      element: <DistrictAdminPrincipalDashboard/>
    },
    adminPromptBankRoute,
    {
      path: adminPaths.assignmentsDistrictDetail,
      element: <AssignmentsDistrictDetail/>
    },
    {
      path: adminPaths.dvSetup,
      element : <DvSetup/>,
    },
    adminResourcesRoute,
    adminReportsRoute,
    adminReportSettingsRoute,
    adminGeneralSettingsRoute,

    ...trainingRoutes,
  ]
};

const adminRoutes_DAM_PR = {
  workAreaTag: WorkArea.DAM_PR,
  routes: [
    {
      path: adminPaths.assignmentsDistrictDetail,
      element: <AssignmentsDistrictDetail/>
    },
    {
      path: adminPaths.dvSetup,
      element : <DvSetup/>,
    },
  ]
};

const adminRoutes_DA_TR = {
  workAreaTag: WorkArea.DA_TR,
  routes: [
    {
      path: adminPaths.daTrDashboard,
      element: <DistrictAdminTeacherDashboard/>
    },
    adminPromptBankRoute,
    {
      path: adminPaths.assignmentsDistrictSummary,
      element: <AssignmentsDistrictSummary/>
    },
    {
      path: adminPaths.assignmentsSchoolDetail,
      element : <AssignmentsSchoolDetail/>,
    },
    {
      path: adminPaths.dteSetup,
      element : <DteSetup/>,
    },
    {
      path: adminPaths.dvSetup,
      element : <DvSetup/>,
    },
    adminResourcesRoute,
    adminReportsRoute,
    adminReportSettingsRoute,
    adminGeneralSettingsRoute,

    ...trainingRoutes,
  ]
} ;

const adminRoutes_DAM_TR = {
  workAreaTag: WorkArea.DAM_TR,
  routes: [
    {
      path: adminPaths.assignmentsDistrictSummary,
      element: <AssignmentsDistrictSummary/>
    },
    {
      path: adminPaths.assignmentsSchoolDetail,
      element : <AssignmentsSchoolDetail/>,
    },
    {
      path: adminPaths.dteSetup,
      element : <DteSetup/>,
    },
    {
      path: adminPaths.dvSetup,
      element : <DvSetup/>,
    },
  ]
} ;


const adminRoutes_SA_PR = {
  workAreaTag: WorkArea.SA_PR,
  routes: [
    {
      path: adminPaths.saPrDashboard,
      element: <SchoolAdminPrincipalDashboard/>
    },
    adminPromptBankRoute,
    {
      path: adminPaths.assignmentsSchoolDetailRoot,
      element: <AssignmentsDistrictDetail/>
    },
    adminResourcesRoute,
    adminReportsRoute,
    adminReportSettingsRoute,

    ...trainingRoutes,
  ]
};

const adminRoutes_SA_TR = {
  workAreaTag: WorkArea.SA_TR,
  routes: [
    {
      path: adminPaths.saTrDashboard,
      element: <SchoolAdminTeacherDashboard/>
    },
    adminPromptBankRoute,
    {
      path: adminPaths.assignmentsSchoolDetailRoot,
      element: <AssignmentsDistrictDetail/>
    },
    adminResourcesRoute,
    adminReportsRoute,
    adminReportSettingsRoute,

    ...trainingRoutes,
  ]
};

const evaluationRoutes_PR_TR = {
  workAreaTag: WorkArea.PR_TR,
  routes: [
    {
      path: evaluationPaths.prTrDashboard,
      element: <PrTrDashboard/>
    },
    ...evaluationRoutes_coreRoutes,

    // admin section
    {
      path: adminPaths.assignmentsSchoolDetailRoot,
      element : <AssignmentsSchoolDetail/>,
    },
    adminPromptBankRoute,
    adminReportSettingsRoute,

    ...trainingRoutes,
  ]
};

const evaluationRoutes_PR_PR = {
  workAreaTag: WorkArea.PR_PR,
  routes: [
    {
      path: evaluationPaths.prPrDashboard,
      element: <PrPrDashboard/>
    },
    ...evaluationRoutes_coreRoutes,

    // admin section
    {
      path: adminPaths.assignmentsSchoolDetail,
      element : <AssignmentsSchoolDetail/>,
    },
    adminPromptBankRoute,
    adminReportSettingsRoute,

    ...trainingRoutes,
  ]
};

const evaluationRoutes_DTE = {
  workAreaTag: WorkArea.DTE,
  routes: [
    {
      path: evaluationPaths.dteDashboard,
      element: <DteDashboard/>
    },
    ...evaluationRoutes_coreRoutes,

    // admin section
    {
      path: adminPaths.assignmentsDistrictDetail,
      element : <AssignmentsDistrictDetail/>,
    },
    adminPromptBankRoute,
    adminReportSettingsRoute,
    
    ...trainingRoutes,
  ]
};

const evaluationRoutes_DE = {
  workAreaTag: WorkArea.DE,
  routes: [
    {
      path: evaluationPaths.deDashboard,
      element: <DeDashboard/>
    },
    ...evaluationRoutes_coreRoutes,
 
    // admin section
    {
      path: adminPaths.assignmentsDistrictDetail,
      element : <AssignmentsDistrictDetail/>,
    },
    adminPromptBankRoute,
    adminReportSettingsRoute,

    ...trainingRoutes,
  ]
};

const evaluationRoutes_CT = {
  workAreaTag: WorkArea.CT,
  routes: [
    {
      path: evaluationPaths.ctDashboard,
      element: <CtDashboard/>
    },
    evaluationSharedRoutes.artifacts,
    evaluationSharedRoutes.ytdEvidence,
    evaluationSharedRoutes.observations,
    evaluationSharedRoutes.midYearEvaluation,
    evaluationSharedRoutes.summativeEvaluation,
    evaluationSharedRoutes.resources,
    ...trainingRoutes,
  ]
};

const evaluationRoutes_PR_ME = {
  workAreaTag: WorkArea.PR_ME,
  routes: [
    {
      path: evaluationPaths.prMeDashboard,
      element: <PrMeDashboard/>
    },
    ...evaluationRoutes_coreRoutes,

    ...trainingRoutes,
  ]
};

const evaluationRoutes_TR_ME = {
  workAreaTag: WorkArea.TR_ME,
  routes: [
    {
      path: evaluationPaths.trMeDashboard,
      element: <TrMeDashboard/>
    },
    ...evaluationRoutes_coreRoutes,

    ...trainingRoutes,
  ]
};

const districtViewerRoutes_DV_PR_PR = {
  workAreaTag: WorkArea.DV_PR_PR,
  routes: [
    {
      path: districtViewerPaths.prPrDashboard,
      element: <DvPrPrDashboard/>
    },
    ...evaluationRoutes_coreRoutes,

    ...trainingRoutes,
  ]
};

const districtViewerRoutes_DV_PR_TR = {
  workAreaTag: WorkArea.DV_PR_TR,
  routes: [
    {
      path: districtViewerPaths.prTrDashboard,
      element: <DvPrTrDashboard/>
    },
    ...evaluationRoutes_coreRoutes,

    ...trainingRoutes,
  ]
};

const districtViewerRoutes_DV_DTE = {
  workAreaTag: WorkArea.DV_DTE,
  routes: [
    {
      path: districtViewerPaths.dteDashboard,
      element: <DvDteDashboard/>
    },
    ...evaluationRoutes_coreRoutes,

    ...trainingRoutes,
  ]
};

const districtViewerRoutes_DV_DE = {
  workAreaTag: WorkArea.DV_DE,
  routes: [
    {
      path: districtViewerPaths.deDashboard,
      element: <DvDeDashboard/>
    },
    ...evaluationRoutes_coreRoutes,

    ...trainingRoutes,
  ]
};

const districtViewerRoutes_DV_CT = {
  workAreaTag: WorkArea.DV_CT,
  routes: [
    {
      path: districtViewerPaths.ctDashboard,
      element: <DvCtDashboard/>
    },
    ...evaluationRoutes_coreRoutes,

    ...trainingRoutes,
  ]
};

export const ROUTER_ROUTES = [
  // admin routes
  adminRoutes_DA_PR,
  adminRoutes_DA_TR,
  adminRoutes_DAM_PR,
  adminRoutes_DAM_TR,
  adminRoutes_SA_PR,
  adminRoutes_SA_TR,
  // evaluator routes
  evaluationRoutes_PR_PR,
  evaluationRoutes_PR_TR,
  evaluationRoutes_DTE,
  evaluationRoutes_DE,
  evaluationRoutes_CT,
  // evaluatee routes
  evaluationRoutes_PR_ME,
  evaluationRoutes_TR_ME,
  // district viewer routes
  districtViewerRoutes_DV_PR_PR,
  districtViewerRoutes_DV_PR_TR,
  districtViewerRoutes_DV_DTE,
  districtViewerRoutes_DV_DE,
  districtViewerRoutes_DV_CT,
];
