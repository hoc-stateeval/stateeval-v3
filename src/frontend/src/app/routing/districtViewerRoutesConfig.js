import { lazy } from 'react'
import { DistrictViewerWorkAreas } from '../core/workAreas';
const DistrictViewerDashboard = lazy(() => import('../features/district-viewer/dashboards/DistrictViewerDashboard'));

const DistrictViewerRoutes =   {
  workAreaTags: DistrictViewerWorkAreas,
  items: [
  {
    path: "/app/district-viewer/dashboard",
    element: <DistrictViewerDashboard />,
    workAreaTags: DistrictViewerWorkAreas
  },
], 
};

export default DistrictViewerRoutes;
