import { lazy } from 'react'
import PrivateRoute from './PrivateRoute';
import { WorkAreas } from '../core/workAreas';
const DistrictViewerCTDashboard = lazy(() => import('../dashboards/dv-ct/Dashboard'));
const DistrictViewerDEDashboard = lazy(() => import('../dashboards/dv-de/Dashboard'));
const DistrictViewerDTEDashboard = lazy(() => import('../dashboards/dv-dte/Dashboard'));
const DistrictViewerPRPRDashboard = lazy(() => import('../dashboards/dv-pr-pr/Dashboard'));
const DistrictViewerPRTRDashboard = lazy(() => import('../dashboards/dv-pr-tr/Dashboard'));

const DistrictViewerRoutes = [
  {
    path: '/app/dashboards/dv-ct',
    element: <PrivateRoute element={<DistrictViewerCTDashboard/>} workAreaTags={[WorkAreas.DV_CT]} />,
  },
  {
    path: '/app/dashboards/dv-de',
    element: <PrivateRoute element={<DistrictViewerDEDashboard/>} workAreaTags={[WorkAreas.DV_DE]} />,
  },
  {
    path: '/app/dashboards/dv-dte',
    element: <PrivateRoute element={<DistrictViewerDTEDashboard/>} workAreaTags={[WorkAreas.DV_DTE]} />,
  },
  {
    path: '/app/dashboards/dv-pr-pr',
    element: <PrivateRoute element={<DistrictViewerPRPRDashboard/>} workAreaTags={[WorkAreas.DV_PR_PR]} />,
  },
  {
    path: '/app/dashboards/dv-pr-tr',
    element: <PrivateRoute element={<DistrictViewerPRTRDashboard/>} workAreaTags={[WorkAreas.DV_PR_TR]} />,
  },
];

export default DistrictViewerRoutes;
