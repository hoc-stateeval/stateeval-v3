import { lazy } from 'react'
const Artifacts = lazy(() => import('../features/evaluation/artifacts/Artifacts'));
const Artifact = lazy(() => import('../features/evaluation/artifacts/Artifact'));
const TestPage = lazy(() => import('../features/Test'));
const TR_ME = lazy(() => import('../features/TR_ME'));
const PR_TR = lazy(() => import('../features/PR_TR'));

const EvaluationRoutes = [
  {
    path: "/app/dashboard",
    element: <TestPage />
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
    element: <TR_ME />,
  },
  {
    path: "/app/evaluation/pr_tr",
    element: <PR_TR />,
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
];

export default EvaluationRoutes;