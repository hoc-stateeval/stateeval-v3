import { lazy } from 'react'
import { WorkAreas, AdminWorkAreas } from '../core/workAreas';
const AssignmentsSummary = lazy(() => import('../features/admin/assignments/AssignmentsSummary'));
const AssignmentsDetail = lazy(() => import('../features/admin/assignments/AssignmentsDetail'));
const DistrictAdminDashboard = lazy(() => import('../features/admin/dashboards/district-admin/DistrictAdminDashboard'));

const AdminRoutes =   {
  workAreaTags: AdminWorkAreas,
  items: [
  {
    path: "/app/dashboard",
    element: <DistrictAdminDashboard />,
    workAreaTags: [ WorkAreas.DA_TR, WorkAreas.DA_PR]
  },
  {
    path: "/app/admin/assignments/tr-assignments-summary",
    element: <AssignmentsSummary />,
    workAreaTags: [WorkAreas.DA_TR]
  },
  {
    path: "/app/admin/assignments/tr-assignments-summary/assignments-detail/:schoolCode/:schoolName",
    element: <AssignmentsDetail />,
    workAreaTags: [WorkAreas.DA_TR]
  },
  {
    path: "/app/admin/assignments/assignments-detail",
    element: <AssignmentsSummary />,
    workAreaTags: [WorkAreas.DA_PR]
  },
], 
};

export default AdminRoutes;