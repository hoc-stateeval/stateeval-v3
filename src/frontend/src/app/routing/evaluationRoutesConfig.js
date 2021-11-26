import { lazy } from 'react'

const TestPage = lazy(() => import('../features/Test'));

const EvaluationRoutes = [
  {
    path: "/app/evaluation/artifacts",
    element: <TestPage />,
    children: [
      { path: ":id", element: <TestPage /> },
    ]
  },
  {
    path: "/app/evaluation/ytd-ec",
    element: <TestPage />,
  },
  {
    path: "/app/evaluation/sgg",
    element: <TestPage />,
  },
  {
    path: "/app/evaluation/observations",
    element: <TestPage />,
    children: [
      { path: ":id", element: <TestPage /> },
    ]
  },
  {
    path: "/app/evaluation/self-assessments",
    element: <TestPage />,
    children: [
      { path: ":id", element: <TestPage /> },
    ]
  },
  {
    path: "/app/evaluation/summative-eval",
    element: <TestPage />,
  },
];

export default EvaluationRoutes;