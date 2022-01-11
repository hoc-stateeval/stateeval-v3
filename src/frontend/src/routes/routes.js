import { lazy } from 'react'

import { WorkArea } from '@lib/enums';
import { adminPaths, evaluationPaths } from '@routes/paths';

/******** Admin Routes **************/
const DistrictAdminTeacherDashboard = lazy(() => import('@admin/dashboards/da-tr/Dashboard'));
const DistrictAdminPrincipalDashboard = lazy(() => import('@admin/dashboards/da-pr/Dashboard'));
const AssignmentsDistrictSummary = lazy(() => import('@admin/assignments/AssignmentsDistrictSummary'));
const AssignmentsDistrictDetail = lazy(() => import('@admin/assignments/AssignmentsDistrictDetail'));
const AssignmentsSchoolDetail = lazy(() => import('@admin/assignments/AssignmentsSchoolDetail'));
const DTESetup = lazy(() => import('@admin/assignments/DTESetup'));

/************ Evaluation Routes ***********/
const ArtifactsDashboard = lazy(() => import('@evaluation/artifacts/Dashboard'));
const StudentGrowthDashboard = lazy(() => import('@evaluation/student-growth/Dashboard'));
const YearToDateDashboard = lazy(() => import('@evaluation/ytd/Dashboard'));
const PrTrDashboard = lazy(() => import('@evaluation/dashboards/pr-tr/Dashboard'));
const PrPrDashboard = lazy(() => import('@evaluation/dashboards/pr-pr/Dashboard'));
// const DteDashboard = lazy(() => import('@evaluation/dashboards/dte/Dashboard'));
// const DeDashboard = lazy(() => import('@evaluation/dashboards/de/Dashboard'));
// const CtDashboard = lazy(() => import('@evaluation/dashboards/ct/Dashboard'));
// const PrMeDashboard = lazy(() => import('@evaluation/dashboards/pr-me/Dashboard'));
// const TrMeDashboard = lazy(() => import('@evaluation/dashboards/tr-me/Dashboard'));
const ObservationsDashboard = lazy(() => import('@evaluation/observations/Dashboard'));
const SelfAssessmentsDashboard = lazy(() => import('@evaluation/self-assessments/Dashboard'));
const SummativeEvalDashboard = lazy(() => import('@evaluation/summative-eval/Dashboard'));

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
      path: adminPaths.assignmentsDistrictDetail,
      element: <AssignmentsDistrictDetail/>
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
      path: adminPaths.dteSetup,
      element : <DTESetup/>,
    }
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
  summativeEvaluation: {
    path: evaluationPaths.summativeEvaluation,
    element: <SummativeEvalDashboard/>
  },
  settingsAssignments: {
    path: evaluationPaths.settingsAssignments,
    element: <SummativeEvalDashboard/>
  },
}

const evaluationRoutes_PR_TR = {
  workAreaTag: WorkArea.PR_TR,
  routes: [
    {
      path: evaluationPaths.prTrDashboard,
      element: <PrTrDashboard/>
    },
    evaluationSharedRoutes.artifacts,
    evaluationSharedRoutes.ytdEvidence,
    evaluationSharedRoutes.studentGrowth,
    evaluationSharedRoutes.observations,
    evaluationSharedRoutes.selfAssessments,
    evaluationSharedRoutes.summativeEvaluation,
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
    evaluationSharedRoutes.artifacts,
    evaluationSharedRoutes.ytdEvidence,
    evaluationSharedRoutes.studentGrowth,
    evaluationSharedRoutes.observations,
    evaluationSharedRoutes.selfAssessments,
    evaluationSharedRoutes.summativeEvaluation,
    {
      path: adminPaths.assignmentsSchoolDetail,
      element : <AssignmentsSchoolDetail/>,
    },
  ]
};

const ROUTER_ROUTES = [
  adminRoutes_DA_PR,
  adminRoutes_DA_TR,
  evaluationRoutes_PR_PR,
  evaluationRoutes_PR_TR,
];

export {
  ROUTER_ROUTES,
}
