import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Routes, Route} from 'react-router-dom';
import LocalLogin from '../../authentication/LocalLogin';
import { 
  selectActiveWorkAreaContext,
} from '../store/stateEval/userContextSlice';

import WorkAreaRoutes from '../routing/WorkAreaRoutes';

const NotFound = lazy(() => import('../shared-components/NotFound'));

const MainLayout = () => {
  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  if (!activeWorkAreaContext) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/localLogin" />} />
        <Route path="/localLogin" element={<LocalLogin />} />
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

export default MainLayout;