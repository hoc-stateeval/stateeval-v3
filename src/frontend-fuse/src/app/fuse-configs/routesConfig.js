import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import LocalLoginConfig from 'app/main/login/LocalLoginConfig';
import LogoutConfig from 'app/main/logout/LogoutConfig';
import evaluationRoutesConfigs from 'app/main/evaluation/evaluationRoutesConfigs';
import FuseLoading from '@fuse/core/FuseLoading';
import Error404Page from 'app/main/pages/errors/404/Error404Page';
import ExampleConfig from 'app/main/example/ExampleConfig';

const routeConfigs = [...evaluationRoutesConfigs, LocalLoginConfig, LogoutConfig, ExampleConfig];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, []),
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard" />,
  },
  {
    path: '/loading',
    exact: true,
    component: () => <FuseLoading />,
  },
  {
    path: '/404',
    component: () => <Error404Page />,
  },
  {
    component: () => <Redirect to="/login" />,
  },
];

export default routes;
