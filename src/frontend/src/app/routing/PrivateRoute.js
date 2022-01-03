
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  selectActiveWorkAreaContext,
} from '../store/stateEval/userContextSlice';

const PrivateRoute = ({ element, workAreaTags }) => {

  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);


  // const { isAuthenticated, user, loading } = useSelector(state => state.auth);
  // if (loading) {
  //   return <p className="container">Checking auth..</p>;
  // }
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" state={{ from: location }} />;
  // }

  const correctWorkArea = activeWorkAreaContext && workAreaTags.includes(activeWorkAreaContext.tagName);

  if (!correctWorkArea) {
    return <Navigate to="/login" />; 
  }

  return element;
}

export default PrivateRoute;