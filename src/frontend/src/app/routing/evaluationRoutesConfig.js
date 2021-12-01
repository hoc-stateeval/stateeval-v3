import { lazy } from 'react'
import { EvaluationWorkAreas } from '../core/workAreas';
const ArtifactsDashboard = lazy(() => import('../features/evaluation/artifacts/Dashboard'));
const StudentGrowthDashboard = lazy(() => import('../features/evaluation/student-growth/Dashboard'));
const YearToDateDashboard = lazy(() => import('../features/evaluation/ytd/Dashboard'));
const EvaluationDashboard = lazy(() => import('../features/evaluation/dashboards/EvaluationDashboard'));
const ObservationsDashboard = lazy(() => import('../features/evaluation/observations/Dashboard'));
const SelfAssessmentsDashboard = lazy(() => import('../features/evaluation/self-assessments/Dashboard'));
const SummativeEvalDashboard = lazy(() => import('../features/evaluation/summative-eval/Dashboard'));
const PromptBank = lazy(() => import('../features/evaluation/settings/prompt-bank/PromptBank'));

const EvaluationRoutes =   {
  workAreaTags: EvaluationWorkAreas,
  items: [
  {
    path: "/app/evaluation/dashboards",
    element: <EvaluationDashboard />,
  },
  {
    path: "/app/evaluation/artifacts",
    element: <ArtifactsDashboard />,
  },
  {
    path: "/app/evaluation/ytd",
    element: <YearToDateDashboard />,
  },
  {
    path: "/app/evaluation/sgg",
    element: <StudentGrowthDashboard />,
  },
  {
    path: "/app/evaluation/observations",
    element: <ObservationsDashboard />,
  },
  {
    path: "/app/evaluation/self-assessments",
    element: <SelfAssessmentsDashboard />,
  },
  {
    path: "/app/evaluation/summative-eval",
    element: <SummativeEvalDashboard />,
  },
  {
    path: "/app/evaluation/settings/prompt-bank",
    element: <PromptBank />,
  },
], 
};

export default EvaluationRoutes;