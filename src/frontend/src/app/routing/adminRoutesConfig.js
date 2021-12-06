import { lazy } from 'react'
import { WorkAreas, AdminWorkAreas } from '../core/workAreas';
const Assignments = lazy(() => import('../features/admin/assignments/Assignments'));
const DADashboard = lazy(() => import('../features/admin/dashboards/district-admin/DADashboard'));

const AdminRoutes =   {
  workAreaTags: AdminWorkAreas,
  items: [
  {
    path: "/app/dashboard",
    element: <DADashboard />,
    workAreaTags: [ WorkAreas.DA]
  },
  {
    path: "/app/admin/assignments",
    element: <Assignments />,
  },
], 
};

export default AdminRoutes;