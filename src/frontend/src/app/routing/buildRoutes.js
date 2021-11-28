import { Navigate } from 'react-router-dom';
import { lazy } from 'react'
import evaluationRoutesConfigs from './evaluationRoutesConfig';

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
    { path: "404", element: <NotFound /> },
    { path: "*", element: <Navigate to="/404" /> },
    // { path: "", element: <Navigate to="/app/dashboard" /> },
    // { path: "/", element: <Navigate to="/app/dashboard" /> }
  ];

  return routes;
}
 
export default buildRoutes;
 