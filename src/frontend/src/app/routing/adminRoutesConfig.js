import { lazy } from 'react'
import { WorkAreas, AdminWorkAreas } from '../core/workAreas';
const AssignmentsDistrictSummary = lazy(() => import('../features/admin/assignments/AssignmentsDistrictSummary'));
const AssignmentsDistrictDetail = lazy(() => import('../features/admin/assignments/AssignmentsDistrictDetail'));
const AssignmentsSchoolDetail = lazy(() => import('../features/admin/assignments/AssignmentsSchoolDetail'));
const DistrictAdminDashboard = lazy(() => import('../features/admin/dashboards/district-admin/DistrictAdminDashboard'));
const DTESetup = lazy(() => import('../features/admin/assignments/DTESetup'));

const AdminRoutes =   {
  workAreaTags: AdminWorkAreas,
  items: [
  {
    path: "/app/dashboard",
    element: <DistrictAdminDashboard />,
    workAreaTags: [ WorkAreas.DA_TR, WorkAreas.DA_PR]
  },
  {
    path: "/app/admin/assignments/district-summary",
    element: <AssignmentsDistrictSummary />,
    workAreaTags: [WorkAreas.DA_TR]
  },
  {
    path: "/app/admin/assignments/school-detail/:schoolCode/:schoolName",
    element: <AssignmentsSchoolDetail />,
    workAreaTags: [WorkAreas.DA_TR]
  },
  {
    path: "/app/admin/assignments/district-detail",
    element: <AssignmentsDistrictDetail />,
    workAreaTags: [WorkAreas.DA_PR]
  },
  {
    path: "/app/admin/assignments/dte-setup",
    element: <DTESetup />,
    workAreaTags: [WorkAreas.DA_TR]
  },
], 
};

export default AdminRoutes;
