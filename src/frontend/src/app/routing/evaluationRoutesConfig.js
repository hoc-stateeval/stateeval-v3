import { lazy } from 'react'
import { EvaluationWorkAreas } from '../core/workAreas';
const Artifacts = lazy(() => import('../features/evaluation/artifacts/Artifacts'));
const Artifact = lazy(() => import('../features/evaluation/artifacts/Artifact'));
const TestPage = lazy(() => import('../features/Test'));
const TRME = lazy(() => import('../features/TRME'));
const PRTR = lazy(() => import('../features/PRTR'));


const EvaluationRoutes =   {
  workAreaTags: EvaluationWorkAreas,
  items: [
  {
    path: "/app/dashboard",
    element: <TestPage />,
  },
  {
    path: "/app/evaluation/artifacts",
    element: <Artifacts />,
    children: [
      { path: ":id", element: <Artifact /> },
    ]
  },
  {
    path: "/app/evaluation/tr_me",
    element: <TRME />,
    // workAreaTags: ['TR_ME'],
  },
  {
    path: "/app/evaluation/pr_tr",
    element: <PRTR />,
    // workAreaTags: ['PR_TR'],
  },
  // {
  //   path: "/app/evaluation/ytd-ec",
  //   element: <TestPage />,
  // },
  // {
  //   path: "/app/evaluation/sgg",
  //   element: <TestPage />,
  // },
  // {
  //   path: "/app/evaluation/observations",
  //   element: <TestPage />,
  //   children: [
  //     { path: ":id", element: <TestPage /> },
  //   ]
  // },
  // {
  //   path: "/app/evaluation/self-assessments",
  //   element: <TestPage />,
  //   children: [
  //     { path: ":id", element: <TestPage /> },
  //   ]
  // },
  // {
  //   path: "/app/evaluation/summative-eval",
  //   element: <TestPage />,
  // },
], 
};

export default EvaluationRoutes;