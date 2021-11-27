import { useRoutes, Navigate } from 'react-router-dom';
import { lazy } from 'react'
import evaluationRoutesConfigs from './evaluationRoutesConfig';

const TestPage = lazy(() => import('../features/Test'));
const Artifacts = lazy(() => import('../features/evaluation/artifacts/Artifacts'));
const NotFound = lazy(() => import('./NotFound'));

const generateRoutesFromConfigs = (routeConfigs, workArea) => {
  return routeConfigs;
}

const buildRoutes = (activeWorkAreaContext) => {

  const routeConfigs = [...evaluationRoutesConfigs];
  const appRoutes = activeWorkAreaContext?
          generateRoutesFromConfigs(routeConfigs, activeWorkAreaContext.tagName): [];
  const routes = [
    ...appRoutes,
    {
      path: "/app/dashboard",
      element: <TestPage />
    },
    { path: "404", element: <NotFound /> },
    { path: "*", element: <Navigate to="/404" /> },
    // { path: "", element: <Navigate to="/app/dashboard" /> },
    // { path: "/", element: <Navigate to="/app/dashboard" /> }
  ];

  return routes;
}
 
export default buildRoutes;
 