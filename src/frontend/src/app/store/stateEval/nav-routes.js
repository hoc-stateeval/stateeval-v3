import { lazy } from 'react'
import { WorkAreas } from '../../core/workAreas';
import PrivateRoute from '../../routing/PrivateRoute';

import GridViewIcon from '@mui/icons-material/GridView';

const DistrictAdminTeacherDashboard = lazy(() => import('../../dashboards/da-tr/Dashboard'));
const DistrictAdminPrincipalDashboard = lazy(() => import('../../dashboards/da-pr/Dashboard'));

const AssignmentsDistrictDetail = lazy(() => import('../../features/admin/assignments/AssignmentsDistrictDetail'));
const AssignmentsDistrictSummary = lazy(() => import('../../features/admin/assignments/AssignmentsDistrictSummary'));
const AssignmentsSchoolDetail = lazy(() => import('../../features/admin/assignments/AssignmentsSchoolDetail'));
const DTESetup = lazy(() => import('../../features/admin/assignments/DTESetup'));

const DASHBOARD_ROUTES = {
  DA_PR_DASHBOARD : '/app/dashboards/da-pr',
  DA_TR_DASHBOARD : '/app/dashboards/da-tr',
}
const ROUTES = {
  ...DASHBOARD_ROUTES,
  DA_TR_DTE_SETUP: '/app/admin/assignments/dte-setup',
  ASSIGNMENTS_DISTRICT_SUMMARY : '/app/admin/assignments/district-summary',
  ASSIGNMENTS_DISTRICT_DETAIL : '/app/admin/assignments/district-detail',
  ASSIGNMENTS_SCHOOL_DETAIL : '/app/admin/assignments/school-detail/:schoolCode/:schoolName',

};

const NAV_ROUTES = [
  {
    workAreaTag: WorkAreas.DA_TR,
    routes: [
      {
        title: 'Dashboard',
        icon: <GridViewIcon fontSize="small" />,
        path: ROUTES.DA_TR_DASHBOARD,
        element: <DistrictAdminTeacherDashboard/>
      },
      {
        title: 'Assignments',
        icon: <GridViewIcon fontSize="small" />,
        path: ROUTES.ASSIGNMENTS_DISTRICT_SUMMARY,
        element: <AssignmentsDistrictSummary/>
      },
      {
        title: 'School Assignments',
        path: ROUTES.ASSIGNMENTS_SCHOOL_DETAIL,
        icon: <GridViewIcon fontSize="small" />,
        element : <AssignmentsSchoolDetail/>,
      },
      {
        title: 'DTE Setup',
        path: ROUTES.DA_TR_DTE_SETUP,
        icon: <GridViewIcon fontSize="small" />,
        element : <DTESetup/>,
      }
    ]
  },
  {
    workAreaTag: WorkAreas.DA_PR,
    routes: [
      {
        title: 'Dashboard',
        icon: <GridViewIcon fontSize="small" />,
        path: ROUTES.DA_PR_DASHBOARD,
        element: <DistrictAdminPrincipalDashboard/>
      },
      {
        title: 'Assignments',
        path: ROUTES.ASSIGNMENTS_DISTRICT_DETAIL,
        icon: <GridViewIcon fontSize="small" />,
        element : <AssignmentsDistrictDetail/>,
      }
    ]
  } 
] 

const buildNavRoutesForWorkArea = (workArea) => {

  return NAV_ROUTES.reduce((finalRoutes, next)=> {
    if (next.workAreaTag === workArea.tagName) {
      const workAreaRoutes = next.routes.map((x)=>(
        {
          path: x.path, 
          element: <PrivateRoute element={x.element} workAreaTags={[next.workAreaTag]} />
        } 
      ));
      finalRoutes.push({
        workAreaTag: next.workAreaTag,
        routes: workAreaRoutes,
      });
    }
    return finalRoutes;
  }, []);
}




export default buildNavRoutesForWorkArea;
