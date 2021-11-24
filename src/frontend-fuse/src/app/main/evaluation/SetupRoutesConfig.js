import { lazy } from 'react';
import authRoles from 'app/auth/authRoles';

const SetupRoutesConfig = {
  settings: {
    layout: {},
  },
  auth: authRoles.EVALUATION,
  routes: [
    {
      path: '/evaluation/setup/assignments',
      component: lazy(() => import('./setup/assignments/Assignments')),
    },
  ],
};

export default SetupRoutesConfig;
