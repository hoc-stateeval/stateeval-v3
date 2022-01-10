import { useSelector } from "react-redux";

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
  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  const activeDistrictViewerSchoolCode = useSelector(
    selectActiveDistrictViewerSchoolCode
  );
  const activeDistrictViewerEvaluatorId = useSelector(
    selectActiveDistrictViewerEvaluatorId
  );

  const waitOnDependencies =
    activeDistrictViewerEvaluatorId === "0" ||
    activeDistrictViewerSchoolCode === "0";
  const { data: evaluations } = useGetEvaluationsForDistrictViewerQuery(
    {
      frameworkContextId: activeWorkAreaContext.frameworkContextId,
      evaluatorId: activeDistrictViewerEvaluatorId,
      schoolCode: activeDistrictViewerSchoolCode,
    },
    { skip: waitOnDependencies }
  );

  return (
    <>
      <DistrictViewerSchoolDropDown />
      <DistrictViewerEvaluatorDropDown />
      <EvaluatingDropDown evaluations={waitOnDependencies ? [] : evaluations} />
    </>
  );
};

export default DistrictViewerSchoolEvaluatorOptions;