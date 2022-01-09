import { lazy } from 'react'
import PrivateRoute from '../../shared-components';
import { WorkArea } from '../../enums';
const DistrictViewerCTDashboard = lazy(() => import('../../dashboards/dv-ct/Dashboard'));
const DistrictViewerDEDashboard = lazy(() => import('../../dashboards/dv-de/Dashboard'));
const DistrictViewerDTEDashboard = lazy(() => import('../../dashboards/dv-dte/Dashboard'));
const DistrictViewerPRPRDashboard = lazy(() => import('../../dashboards/dv-pr-pr/Dashboard'));
const DistrictViewerPRTRDashboard = lazy(() => import('../../dashboards/dv-pr-tr/Dashboard'));

export const DistrictViewerRoutes = [
  {
    path: '/app/dashboards/dv-ct',
    element: <PrivateRoute element={<DistrictViewerCTDashboard/>} workAreaTags={[WorkArea.DV_CT]} />,
  },
  {
    path: '/app/dashboards/dv-de',
    element: <PrivateRoute element={<DistrictViewerDEDashboard/>} workAreaTags={[WorkArea.DV_DE]} />,
  },
  {
    path: '/app/dashboards/dv-dte',
    element: <PrivateRoute element={<DistrictViewerDTEDashboard/>} workAreaTags={[WorkArea.DV_DTE]} />,
  },
  {
    path: '/app/dashboards/dv-pr-pr',
    element: <PrivateRoute element={<DistrictViewerPRPRDashboard/>} workAreaTags={[WorkArea.DV_PR_PR]} />,
  },
  {
    path: '/app/dashboards/dv-pr-tr',
    element: <PrivateRoute element={<DistrictViewerPRTRDashboard/>} workAreaTags={[WorkArea.DV_PR_TR]} />,
  },
];

