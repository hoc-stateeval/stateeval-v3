import { useSelector } from "react-redux";

import { 
  useGetEvaluationsForDistrictViewerQuery 
} from "@api-slice";

import {
  selectActiveWorkAreaContext,
  selectActiveDistrictViewerEvaluatorId,
} from "@user-context-slice";

import DistrictViewerEvaluatorDropDown from "./DistrictViewerEvaluatorDropDown";
import EvaluatingDropDown from "./EvaluatingDropDown";

const DistrictViewerDistrictEvaluatorOptions = () => {
  
  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  const activeDistrictViewerEvaluatorId = useSelector(
    selectActiveDistrictViewerEvaluatorId
  );

  const waitOnDependencies = activeDistrictViewerEvaluatorId === "0";
  const { data: evaluations } = useGetEvaluationsForDistrictViewerQuery(
    {
      frameworkContextId: activeWorkAreaContext.frameworkContextId,
      evaluatorId: activeDistrictViewerEvaluatorId,
      schoolCode: "",
    },
    { skip: waitOnDependencies }
  );

  return (
    <>
      <DistrictViewerEvaluatorDropDown  schoolCode="" />
      <EvaluatingDropDown evaluations={waitOnDependencies ? [] : evaluations} />
    </>
  );
};

export default DistrictViewerDistrictEvaluatorOptions;
