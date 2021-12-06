import { useSelector } from 'react-redux';
import { lazy } from 'react'
import { Navigate, Routes, Route, useRoutes } from 'react-router-dom';
import LocalLogin from '../../authentication/LocalLogin';
import Layout from './Layout';
import buildRoutes from '../routing/buildRoutes';
import { selectActiveWorkAreaContext } from '../store/stateEval/userContextSlice';
const DADashboard = lazy(() => import('../features/admin/dashboards/district-admin/DADashboard'));


const MainLayout = () => {
  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  const routes = useRoutes(buildRoutes(activeWorkAreaContext));

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
      </Routes>
    )}
    </>
  );
}

export default MainLayout;