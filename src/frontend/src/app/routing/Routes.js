import { useRoutes, Navigate } from 'react-router-dom';
import { lazy } from 'react'
import evaluationRoutesConfigs from './evaluationRoutesConfig';

const TestPage = lazy(() => import('../features/Test'));
const NotFound = lazy(() => import('./NotFound'));

const workArea = 'PR_TR';

const generateRoutesFromConfigs = (routeConfigs, workArea) => {
  return routeConfigs;
}

const Routes = () => {

  const routeConfigs = [...evaluationRoutesConfigs];
  const appRoutes = generateRoutesFromConfigs(routeConfigs, workArea);
  const routes = [
    ...appRoutes,
    {
      path: "/app/dashboard",
      element: <TestPage />
    },
    { path: "404", element: <NotFound /> },
    { path: "*", element: <Navigate to="/404" /> },
    { path: "", element: <Navigate to="/app/dashboard" /> },
    { path: "/", element: <Navigate to="/app/dashboard" /> }
  ];

  const elements = useRoutes(routes);
  return elements;
}
 
export default Routes;
 