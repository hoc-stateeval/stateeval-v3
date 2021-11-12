import { lazy } from 'react';
import authRoles from 'app/auth/authRoles';

const DashboardsRoutesConfig = {
  settings: {
    layout: {},
  },
  auth: authRoles.EVALUATION,
  routes: [
    {
      path: '/dashboard',
      component: lazy(() => import('./dashboards/Dashboard/Dashboard')),
    },
  ],
};

export default DashboardsRoutesConfig;
