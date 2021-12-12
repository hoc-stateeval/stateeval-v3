import { lazy } from 'react'
import { WorkAreas, AdminWorkAreas } from '../core/workAreas';
const AssignmentsSummary = lazy(() => import('../features/admin/assignments/AssignmentsSummary'));
const AssignmentsDetail = lazy(() => import('../features/admin/assignments/AssignmentsDetail'));
const DADashboard = lazy(() => import('../features/admin/dashboards/district-admin/DADashboard'));

const AdminRoutes =   {
  workAreaTags: AdminWorkAreas,
  items: [
  {
    path: "/app/dashboard",
    element: <DADashboard />,
    workAreaTags: [ WorkAreas.DA_TR, WorkAreas.DA_PR]
  },
  {
    path: "/app/admin/assignments/assignments-summary",
    element: <AssignmentsSummary />,
    workAreaTags: [WorkAreas.DA_TR]
  },
  {
    path: "/app/admin/assignments/assignments-summary/assignments-detail/:schoolCode",
    element: <AssignmentsDetail />,
  },
], 
};

export default AdminRoutes;