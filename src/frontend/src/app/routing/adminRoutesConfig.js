import { lazy } from 'react'
import { WorkAreas, AdminWorkAreas } from '../core/workAreas';
const AssignmentsDistrictSummary = lazy(() => import('../features/admin/assignments/AssignmentsDistrictSummary'));
const AssignmentsDistrictDetail = lazy(() => import('../features/admin/assignments/AssignmentsDistrictDetail'));
const AssignmentsSchoolDetail = lazy(() => import('../features/admin/assignments/AssignmentsSchoolDetail'));
const DistrictAdminTeacherDashboard = lazy(() => import('../dashboards/da-tr/Dashboard'));
const DistrictAdminPrincipalDashboard = lazy(() => import('../dashboards/da-pr/Dashboard'));
const DTESetup = lazy(() => import('../features/admin/assignments/DTESetup'));

const AdminRoutes =   {
  workAreaTags: AdminWorkAreas,
  items: [
  {
    path: "/app/dashboards/da-tr",
    element: <DistrictAdminTeacherDashboard />,
    workAreaTags: [WorkAreas.DA_TR]
  },
  {
    path: "/app/dashboards/da-pr",
    element: <DistrictAdminPrincipalDashboard />,
    workAreaTags: [WorkAreas.DA_PR]
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
