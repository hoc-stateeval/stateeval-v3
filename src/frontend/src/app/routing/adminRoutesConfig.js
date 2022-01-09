import { lazy } from 'react'

import GridViewIcon from '@mui/icons-material/GridView';

import adminPaths from './adminPaths';

const DistrictAdminTeacherDashboard = lazy(() => import('../dashboards/da-tr/Dashboard'));
const DistrictAdminPrincipalDashboard = lazy(() => import('../dashboards/da-pr/Dashboard'));
const AssignmentsDistrictSummary = lazy(() => import('../features/admin/assignments/AssignmentsDistrictSummary'));
const AssignmentsDistrictDetail = lazy(() => import('../features/admin/assignments/AssignmentsDistrictDetail'));
const AssignmentsSchoolDetail = lazy(() => import('../features/admin/assignments/AssignmentsSchoolDetail'));
const DTESetup = lazy(() => import('../features/admin/assignments/DTESetup'));

const sharedRoutes = {
  assignmentsSchoolDetail:  {
    title: 'Assignments',
    path: adminPaths.assignmentsSchoolDetail,
    icon: <GridViewIcon fontSize="small" />,
    element : <AssignmentsSchoolDetail/>,
  },
  promptBank:  {
    title: 'Prompt Bank',
    path: adminPaths.promptBank,
    icon: <GridViewIcon fontSize="small" />,
    element : <AssignmentsSchoolDetail/>,
  },
};

const adminRoutes_DA_PR = [
  {
    path: adminPaths.daPrDashboard,
    element: <DistrictAdminPrincipalDashboard/>
  },
  {
    path: adminPaths.assignmentsDistrictDetail,
    element: <AssignmentsDistrictDetail/>
  },
  sharedRoutes.assignmentsSchoolDetail,
];

const adminRoutes_DA_TR = {
  routes: [
    {
      path: adminPaths.daTrDashboard,
      element: <DistrictAdminTeacherDashboard/>
    },
    {
      path: adminPaths.assignmentsDistrictSummary,
      element: <AssignmentsDistrictSummary/>
    },
    sharedRoutes.assignmentsSchoolDetail,
    {
      path: adminPaths.dteSetup,
      element : <DTESetup/>,
    }
  ]
} ;

export {
  adminRoutes_DA_PR,
  adminRoutes_DA_TR,
  sharedRoutes
}
