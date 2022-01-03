import { useSelector } from 'react-redux';
import { lazy } from 'react'
import { Navigate, Routes, Route, useRoutes, useLocation } from 'react-router-dom';
import LocalLogin from '../../authentication/LocalLogin';
import Layout from './Layout';
import buildRoutes from '../routing/buildRoutes';
import { selectActiveWorkAreaContext } from '../store/stateEval/userContextSlice';

const NotFound = lazy(() => import('../routing/NotFound'));

const MainLayout = () => {
  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  const routeConfig = buildRoutes(activeWorkAreaContext);
  const routes = useRoutes(routeConfig);

  const location = useLocation();
  console.log(location);
  return (
    <>
    { activeWorkAreaContext ? (
      <Layout>
        {routes}
      </Layout>
    ): (
      <Routes>
          <Route path="/" element={<Navigate to="/localLogin" />} />
          <Route path="/localLogin" element={<LocalLogin />} />
          <Route path="404" element={<NotFound/>} />
          <Route path="*" element={<Navigate to="/localLogin" />} />
      </Routes>
    )}
    </>
  );
}

export default MainLayout;