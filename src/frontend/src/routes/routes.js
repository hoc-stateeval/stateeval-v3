import { lazy } from 'react'

import { WorkArea } from '@lib/enums';
import { adminPaths, evaluationPaths } from '@routes/paths';

/******** Admin Routes **************/
const DistrictAdminTeacherDashboard = lazy(() => import('@admin/dashboards/da-tr/Dashboard'));
const DistrictAdminPrincipalDashboard = lazy(() => import('@admin/dashboards/da-pr/Dashboard'));

const AssignmentsDistrictSummary = lazy(() => import('@admin/assignments/AssignmentsDistrictSummary'));
const AssignmentsDistrictDetail = lazy(() => import('@admin/assignments/AssignmentsDistrictDetail'));
const AssignmentsSchoolDetail = lazy(() => import('@admin/assignments/AssignmentsSchoolDetail'));

const PromptBankDashboard = lazy(() => import('@admin/prompt-bank/Dashboard'));

const DteSetup = lazy(() => import('@admin/dte-setup/Dashboard'));
const DvSetup = lazy(() => import('@admin/dv-setup/Dashboard'));

const AdminGeneralSettingsDashboard = lazy(() => import('@admin/settings/general/Dashboard'));

const AdminResourcesDashboard = lazy(() => import('@admin/resources/Dashboard'));

const AdminReportsDashboard = lazy(() => import('@admin/reports/Dashboard'));

/************ Evaluation Routes ***********/
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

const ObservationsDashboard = lazy(() => import('@evaluation/observations/Dashboard'));
const SelfAssessmentsDashboard = lazy(() => import('@evaluation/self-assessments/Dashboard'));
const SummativeEvalDashboard = lazy(() => import('@evaluation/summative-eval/Dashboard'));
const MidYearEvalDashboard = lazy(() => import('@evaluation/mid-year-eval/Dashboard'));
const EvaluationResourcesDashboard = lazy(() => import('@evaluation/resources/Dashboard'));
/*
 * Admin Routes 
 */

const adminRoutes_DA_PR = {
  workAreaTag: WorkArea.DA_PR,
  routes: [
    {
      path: adminPaths.daPrDashboard,
      element: <DistrictAdminPrincipalDashboard/>
    },
    {
      path: adminPaths.promptBankRoot,
      element: <PromptBankDashboard/>
    },
    {
      path: adminPaths.assignmentsDistrictDetail,
      element: <AssignmentsDistrictDetail/>
    },
    {
      path: adminPaths.settingsGeneral,
      element: <AdminGeneralSettingsDashboard/>
    },
    {
      path: adminPaths.resources,
      element: <AdminResourcesDashboard/>
    },
    {
      path: adminPaths.reports,
      element: <AdminReportsDashboard/>
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
    {
      path: adminPaths.assignmentsDistrictSummary,
      element: <AssignmentsDistrictSummary/>
    },
    {
      path: adminPaths.assignmentsSchoolDetail,
      element : <AssignmentsSchoolDetail/>,
    },
    {
      path: adminPaths.promptBankRoot,
      element: <PromptBankDashboard/>
    },
    {
      path: adminPaths.dteSetup,
      element : <DteSetup/>,
    },
    {
      path: adminPaths.dvSetup,
      element : <DvSetup/>,
    },
    {
      path: adminPaths.settingsGeneral,
      element: <AdminGeneralSettingsDashboard/>
    },
    {
      path: adminPaths.resources,
      element: <AdminResourcesDashboard/>
    },
    {
      path: adminPaths.reports,
      element: <AdminReportsDashboard/>
    },
  ]
} ;

/*
 * Evaluation Routes 
 */

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
  resources: {
    path: evaluationPaths.resources,
    element: <EvaluationResourcesDashboard/>
  },
}

const evaluationRoutes_coreRoutes = [
  evaluationSharedRoutes.artifacts,
  evaluationSharedRoutes.ytdEvidence,
  evaluationSharedRoutes.studentGrowth,
  evaluationSharedRoutes.observations,
  evaluationSharedRoutes.selfAssessments,
  evaluationSharedRoutes.midYearEvaluation,
  evaluationSharedRoutes.summativeEvaluation,
  evaluationSharedRoutes.resources,
];

const evaluationRoutes_PR_TR = {
  workAreaTag: WorkArea.PR_TR,
  routes: [
    {
      path: evaluationPaths.prTrDashboard,
      element: <PrTrDashboard/>
    },
    ...evaluationRoutes_coreRoutes,
    {
      path: adminPaths.assignmentsSchoolDetailRoot,
      element : <AssignmentsSchoolDetail/>,
    },
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
    {
      path: adminPaths.assignmentsSchoolDetail,
      element : <AssignmentsSchoolDetail/>,
    },
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
  ]
};

const ROUTER_ROUTES = [
  adminRoutes_DA_PR,
  adminRoutes_DA_TR,
  // evaluator routes
  evaluationRoutes_PR_PR,
  evaluationRoutes_PR_TR,
  evaluationRoutes_DTE,
  evaluationRoutes_DE,
  evaluationRoutes_CT,
  // evaluatee routes
  evaluationRoutes_PR_ME,
  evaluationRoutes_TR_ME,
];

export {
  ROUTER_ROUTES,
}
