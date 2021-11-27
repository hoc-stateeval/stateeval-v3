import { lazy } from 'react'
const Artifacts = lazy(() => import('../features/evaluation/artifacts/Artifacts'));
const Artifact = lazy(() => import('../features/evaluation/artifacts/Artifact'));

const EvaluationRoutes = [
  {
    path: "/app/evaluation/artifacts",
    element: <Artifacts />,
    children: [
      { path: ":id", element: <Artifact /> },
    ]
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