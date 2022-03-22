import { lazy } from "react";
import { useSelector } from "react-redux";
import { Navigate, Routes, Route } from "react-router-dom";

import { selectActiveWorkAreaContext } from "@user-context-slice";

import { unAuthenticatedPaths } from "@routes/paths";
import WorkAreaRoutes from "@routes/WorkAreaRoutes";

const LocalLogin = lazy(() => import("@routes/login/LocalLogin"));
const NotFound = lazy(() => import("@routes/errors/NotFound"));
const StudentPerceptionSurvey = lazy(() => import("@evaluation/perception-surveys/StudentPerceptionSurvey"));

const RootRoute = () => {
  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  if (!activeWorkAreaContext) {
    return (
      <Routes>
        <Route
          path="/"
          element={<Navigate to={unAuthenticatedPaths.login} />}
        />
        <Route path={unAuthenticatedPaths.studentPerceptionSurvey} element={<StudentPerceptionSurvey />} />
        <Route path={unAuthenticatedPaths.login} element={<LocalLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  } else {
    return <WorkAreaRoutes activeWorkAreaContext={activeWorkAreaContext} />;
  }
};

export default RootRoute;
