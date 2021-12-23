import { Navigate } from 'react-router-dom';
import { lazy } from 'react'
import evaluationRoutesConfigs from './evaluationRoutesConfig';
import adminRoutesConfigs from './adminRoutesConfig';

const NotFound = lazy(() => import('./NotFound'));

const generateRoutesFromConfigs = (routeConfigs, workAreaTag) => {
  const result = routeConfigs.reduce( (acc, next) => {
    if (next.workAreaTags.includes(workAreaTag)) {
      let routes = next.items.filter(x=>(!x.workAreaTags?x:x.workAreaTags.includes(workAreaTag)));
      acc.push(...routes);
    }
    return acc;
  }, []);

  return result;
}

const buildRoutes = (activeWorkAreaContext) => {

  const routeConfigs = [evaluationRoutesConfigs, adminRoutesConfigs];
  const appRoutes = activeWorkAreaContext?
          generateRoutesFromConfigs(routeConfigs, activeWorkAreaContext.tagName): [];
  console.log(appRoutes);
   const routes = [
    ...appRoutes,
    { path: "404", element: <NotFound /> },
    { path: "*", element: <Navigate to="/404" /> },
  ];

  return routes;
}
 
export default buildRoutes;
 