import { useSelector } from 'react-redux';
import {
  DistrictViewerSchoolDropDown,
  DistrictViewerEvaluatorDropDown,
  EvaluatingDropDown
 } from '../../components';

import {
  useGetEvaluationsForDistrictViewerQuery,
 } from '../../../../core/apiSlice';

 import {
  selectActiveWorkAreaContext,
  selectActiveDistrictViewerSchoolCode,
  selectActiveDistrictViewerEvaluatorId,
} from '../../../../store/stateEval/userContextSlice';

export const DistrictViewerSchoolEvaluatorOptions = () => {

  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  const activeDistrictViewerSchoolCode = useSelector(selectActiveDistrictViewerSchoolCode);
  const activeDistrictViewerEvaluatorId = useSelector(selectActiveDistrictViewerEvaluatorId);
 
  const waitOnDependencies = activeDistrictViewerEvaluatorId==="0" || activeDistrictViewerSchoolCode==="0";
  const { data: evaluations } = useGetEvaluationsForDistrictViewerQuery({
    frameworkContextId: activeWorkAreaContext.frameworkContextId,
    evaluatorId: activeDistrictViewerEvaluatorId,
    schoolCode: activeDistrictViewerSchoolCode,
  }, {skip: waitOnDependencies});

  return (
    <>
      <DistrictViewerSchoolDropDown />
      <DistrictViewerEvaluatorDropDown  />
      <EvaluatingDropDown evaluations={waitOnDependencies?[]:evaluations} />
    </>
  );
};
