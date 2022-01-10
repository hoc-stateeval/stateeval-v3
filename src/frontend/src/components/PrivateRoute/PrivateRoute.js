import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectActiveWorkAreaContext } from "@user-context-slice";
import { unAuthenticatedPaths } from "@routes/paths";

const PrivateRoute = ({ element, workAreaTags }) => {
  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  const correctWorkArea =
    activeWorkAreaContext &&
    workAreaTags.includes(activeWorkAreaContext.tagName);

  if (!activeWorkAreaContext || !correctWorkArea) {
    return <Navigate to={unAuthenticatedPaths.login} />;
  }

  return element;
};

export default PrivateRoute;
