
import { lazy } from 'react';
import { Navigate, useRoutes, useLocation} from 'react-router-dom';

import { PrivateRoute, WorkAreaLayout } from '@components';

import { 
  ROUTER_ROUTES 
} from '@routes/routes';

const NotFound = lazy(() => import('@routes/errors/NotFound'));

const buildNavRoutesForWorkArea = (workArea) => {

  if (!workArea) return [];

  return ROUTER_ROUTES.reduce((finalRoutes, next)=> {
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
