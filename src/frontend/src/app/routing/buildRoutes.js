import { Navigate } from 'react-router-dom';
import { lazy } from 'react'
//import evaluationRoutesConfigs from './evaluationRoutesConfig';
import adminRoutesConfigs from './adminRoutesConfig';
import districtViewerRoutesConfigs from './districtViewerRoutesConfig';

const NotFound = lazy(() => import('./NotFound'));

const buildRoutes = (activeWorkAreaContext) => {

  const routeConfigs = [
     // ...evaluationRoutesConfigs, 
      ...adminRoutesConfigs,
      ...districtViewerRoutesConfigs
    ];
  const appRoutes = activeWorkAreaContext? routeConfigs : [];
   const routes = [
    ...appRoutes,
    { path: "404", element: <NotFound /> },
    { path: "*", element: <Navigate to="/404" /> },
  ];

  return routes;
}
 
export default buildRoutes;
 