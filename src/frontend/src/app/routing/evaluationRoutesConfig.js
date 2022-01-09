import { lazy } from 'react'
import GridViewIcon from '@mui/icons-material/GridView';

import { WorkAreas } from '../core/workAreas';
import { sharedRoutes as adminSharedRoutes } from './adminRoutesConfig';

import evaluationPaths from './evaluationPaths';

const ArtifactsDashboard = lazy(() => import('../features/evaluation/artifacts/Dashboard'));
const StudentGrowthDashboard = lazy(() => import('../features/evaluation/student-growth/Dashboard'));
const YearToDateDashboard = lazy(() => import('../features/evaluation/ytd/Dashboard'));
const EvaluationDashboard = lazy(() => import('../features/evaluation/dashboards/EvaluationDashboard'));
const ObservationsDashboard = lazy(() => import('../features/evaluation/observations/Dashboard'));
const SelfAssessmentsDashboard = lazy(() => import('../features/evaluation/self-assessments/Dashboard'));
const SummativeEvalDashboard = lazy(() => import('../features/evaluation/summative-eval/Dashboard'));

const sharedRoutes = {
  dashboard:  {
    path: evaluationPaths.dashboard,
    element: <EvaluationDashboard/>
  },
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
  workAreaTag: WorkAreas.PR_TR,
  routes: [
    sharedRoutes.dashboard,
    sharedRoutes.artifacts,
    sharedRoutes.ytdEvidence,
    sharedRoutes.studentGrowth,
    sharedRoutes.observations,
    sharedRoutes.selfAssessments,
    adminSharedRoutes.assignmentsSchoolDetail
  ]
};

const evaluationRoutes_PR_PR = {
  workAreaTag: WorkAreas.PR_PR,
  routes: [
    sharedRoutes.dashboard,
    sharedRoutes.artifacts,
    sharedRoutes.ytdEvidence,
    sharedRoutes.studentGrowth,
    sharedRoutes.observations,
    sharedRoutes.selfAssessments,
    adminSharedRoutes.assignmentsSchoolDetail
  ]
};

export {
  evaluationRoutes_PR_PR,
  evaluationRoutes_PR_TR
};