import { useSelector } from 'react-redux';
import {
  DistrictViewerEvaluatorDropDown,
  EvaluatingDropDown
 } from '../../components';

import {
  useGetEvaluationsForDistrictViewerQuery,
 } from '../../../../core/apiSlice';

 import {
  selectActiveWorkAreaContext,
  selectActiveDistrictViewerEvaluatorId,
} from '../../../../store/stateEval/userContextSlice';

export const DistrictViewerDistrictEvaluatorOptions = () => {

  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  const activeDistrictViewerEvaluatorId = useSelector(selectActiveDistrictViewerEvaluatorId);
 
  const waitOnDependencies = activeDistrictViewerEvaluatorId==="0" ;
  const { data: evaluations } = useGetEvaluationsForDistrictViewerQuery({
    frameworkContextId: activeWorkAreaContext.frameworkContextId,
    evaluatorId: activeDistrictViewerEvaluatorId,
    schoolCode: '',
  }, {skip: waitOnDependencies});

  return (
    <>
      <DistrictViewerEvaluatorDropDown  />
      <EvaluatingDropDown evaluations={waitOnDependencies?[]:evaluations} />
    </>
  );
};
