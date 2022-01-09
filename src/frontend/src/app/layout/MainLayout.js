import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Routes, Route, useRoutes} from 'react-router-dom';
import LocalLogin from '../../authentication/LocalLogin';
import Layout from './Layout';
import { 
  selectActiveWorkAreaContext,
} from '../store/stateEval/userContextSlice';

import buildNavRoutesForWorkArea from '../routing/nav-routes';

const NotFound = lazy(() => import('../routing/NotFound'));

const MainLayout = () => {
  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  const activeWorkAreaNavRoutes = buildNavRoutesForWorkArea(activeWorkAreaContext)

  const routes = useRoutes(
    [ ...activeWorkAreaNavRoutes,
      { path: "404", element: <NotFound /> },
      { path: "*", element: <Navigate to="/404" /> }
    ]);

  if (!activeWorkAreaContext) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/localLogin" />} />
        <Route path="/localLogin" element={<LocalLogin />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
    )
  }

  return (
    <Layout>
        {routes}
    </Layout>
  )
}

export default MainLayout;