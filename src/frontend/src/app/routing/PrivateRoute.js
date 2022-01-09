
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  selectActiveWorkAreaContext,
} from '../store/stateEval/userContextSlice';

const PrivateRoute = ({ element, workAreaTags }) => {

  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  const correctWorkArea = activeWorkAreaContext && workAreaTags.includes(activeWorkAreaContext.tagName);

  if (!activeWorkAreaContext || !correctWorkArea) {
    return <Navigate to="/localLogin" />;
  }

  return element;
}

export default PrivateRoute;