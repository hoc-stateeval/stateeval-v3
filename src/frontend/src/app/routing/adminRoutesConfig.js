import { lazy } from 'react'
import { WorkAreas } from '../core/workAreas';
import PrivateRoute from './PrivateRoute';

const DistrictAdminTeacherDashboard = lazy(() => import('../dashboards/da-tr/Dashboard'));
const DistrictAdminPrincipalDashboard = lazy(() => import('../dashboards/da-pr/Dashboard'));

const AssignmentsDistrictSummary = lazy(() => import('../features/admin/assignments/AssignmentsDistrictSummary'));
const AssignmentsDistrictDetail = lazy(() => import('../features/admin/assignments/AssignmentsDistrictDetail'));
const AssignmentsSchoolDetail = lazy(() => import('../features/admin/assignments/AssignmentsSchoolDetail'));
const DTESetup = lazy(() => import('../features/admin/assignments/DTESetup'));

const AdminRoutes = [
  {
    path: '/app/dashboards/da-tr',
    element: <PrivateRoute element={<DistrictAdminTeacherDashboard/>} workAreaTags={[WorkAreas.DA_TR]} />,
  },
  {
    path: '/app/dashboards/da-pr',
    element: <PrivateRoute element={<DistrictAdminPrincipalDashboard/>} workAreaTags={[WorkAreas.DA_PR]} />,
  },
  {
    path: '/app/admin/assignments/district-summary',
    element: <PrivateRoute element={<AssignmentsDistrictSummary/>} workAreaTags={[WorkAreas.DA_TR]} />,
  },
  {
    path: '/app/admin/assignments/school-detail/:schoolCode/:schoolName',
    element: <PrivateRoute element={<AssignmentsSchoolDetail/>} workAreaTags={[WorkAreas.DA_TR]} />,
  },
  {
    path: '/app/admin/assignments/district-detail',
    element: <PrivateRoute element={<AssignmentsDistrictDetail/>} workAreaTags={[WorkAreas.DA_PR]} />,
  },
  {
    path: '/app/admin/assignments/dte-setup',
    element: <PrivateRoute element={<DTESetup/>} workAreaTags={[WorkAreas.DA_TR]} />,
  },
];

export default AdminRoutes;
