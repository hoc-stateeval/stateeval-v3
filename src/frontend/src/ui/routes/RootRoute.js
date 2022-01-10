import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Routes, Route} from 'react-router-dom';

import { selectActiveWorkAreaContext } from '@store/stateEval/userContextSlice';

import { unAuthenticatedPaths } from '@ui/routes/paths';
import WorkAreaRoutes from '@ui/routes/WorkAreaRoutes';

const LocalLogin = lazy(() => import('./login/LocalLogin'));
const NotFound = lazy(() => import('./errors/NotFound'));

const RootRoute = () => {
  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  if (!activeWorkAreaContext) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to='./login/LocalLogin'/>} />
        <Route path={unAuthenticatedPaths.loginPath} element={<LocalLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    )
  }
  else {
    return (
      <WorkAreaRoutes activeWorkAreaContext={activeWorkAreaContext}/>
    )
  }
}

export default RootRoute;
