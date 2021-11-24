import { lazy } from 'react';
import authRoles from 'app/auth/authRoles';

const ArtifactsRoutesConfig = {
  settings: {
    layout: {},
  },
  auth: authRoles.EVALUATION,
  routes: [
    {
      path: '/evaluation/artifacts/:artifactId',
      component: lazy(() => import('./artifacts/artifact/Artifact')),
    },
    {
      path: '/evaluation/artifacts',
      component: lazy(() => import('./artifacts/artifacts/Artifacts')),
    },
  ],
};

export default ArtifactsRoutesConfig;
