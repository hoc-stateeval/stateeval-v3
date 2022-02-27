import { useSelector } from "react-redux";
import { useErrorHandler } from "react-error-boundary";

import { useGetEvaluationsForDistrictViewerQuery } from "@api-slice";

import {
  selectActiveWorkAreaContext,
  selectActiveDistrictViewerSchoolCode,
  selectActiveDistrictViewerEvaluatorId,
} from "@user-context-slice";

import DistrictViewerSchoolDropDown from "./DistrictViewerSchoolDropDown";
import DistrictViewerEvaluatorDropDown from "./DistrictViewerEvaluatorDropDown";
import EvaluatingDropDown from "./EvaluatingDropDown";

const DistrictViewerSchoolEvaluatorOptions = () => {

  const errorHandler = useErrorHandler();

  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  const activeDistrictViewerSchoolCode = useSelector(selectActiveDistrictViewerSchoolCode);
  const activeDistrictViewerEvaluatorId = useSelector(selectActiveDistrictViewerEvaluatorId);

  const waitOnDependencies =
    activeDistrictViewerEvaluatorId === "0" ||
    activeDistrictViewerSchoolCode === "0";

  const { data: evaluations, error: getEvaluationsError } = 
    useGetEvaluationsForDistrictViewerQuery(
      {
        frameworkContextId: activeWorkAreaContext.frameworkContextId,
        evaluatorId: activeDistrictViewerEvaluatorId,
        schoolCode: activeDistrictViewerSchoolCode,
      },
      { skip: waitOnDependencies }
    );

  if (getEvaluationsError) errorHandler(getEvaluationsError);

  return (
    <>
      <DistrictViewerSchoolDropDown />
      <DistrictViewerEvaluatorDropDown schoolCode={activeDistrictViewerSchoolCode} />
      <EvaluatingDropDown evaluations={waitOnDependencies ? [] : evaluations} />
    </>
  );
};

export default DistrictViewerSchoolEvaluatorOptions;
