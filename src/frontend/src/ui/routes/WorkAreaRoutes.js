
import { lazy } from 'react';
import { Navigate, useRoutes} from 'react-router-dom';

import { PrivateRoute, WorkAreaLayout } from '@ui/components';

import { 
  adminRoutes_DA_PR, 
  adminRoutes_DA_TR,
  evaluationRoutes_PR_PR, 
  evaluationRoutes_PR_TR 
} from './routes';

const NotFound = lazy(() => import('./errors/NotFound'));

const NAV_ROUTES = [
  adminRoutes_DA_PR,
  adminRoutes_DA_TR,
  evaluationRoutes_PR_PR,
  evaluationRoutes_PR_TR,
];

const buildNavRoutesForWorkArea = (workArea) => {

  if (!workArea) return [];

  return NAV_ROUTES.reduce((finalRoutes, next)=> {
    if (next.workAreaTag === workArea.tagName) {
      const workAreaRoutes = next.routes.map((x)=> {
        return  {
          path: x.path, 
          element: <PrivateRoute element={x.element} workAreaTags={[next.workAreaTag]} />
        }
      });      
      finalRoutes.push(...workAreaRoutes);
    }
    return finalRoutes;
  }, []);
}

const WorkAreaRoutes = ({activeWorkAreaContext}) => {

  const activeWorkAreaNavRoutes = buildNavRoutesForWorkArea(activeWorkAreaContext);

  const routes = useRoutes(
    [ ...activeWorkAreaNavRoutes,
      { path: "404", element: <NotFound /> },
      { path: "*", element: <Navigate to="/404" /> }
    ]);

  return (
    <WorkAreaLayout>
      {routes}
    </WorkAreaLayout>
  )
};

export default WorkAreaRoutes;
