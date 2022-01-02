import { useSelector } from 'react-redux';
import EvaluatingDropDown from './EvaluatingDropDown';
import DistrictViewerEvaluatorDropDown from './DistrictViewerEvaluatorDropDown';

import {
  useGetEvaluationsForDistrictViewerQuery,
 } from '../../core/apiSlice';

 import {
  selectActiveWorkAreaContext,
  selectActiveDistrictViewerEvaluatorId,
} from '../../store/stateEval/userContextSlice';

const DistrictViewerDistrictEvaluatorOptions = () => {

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

export default DistrictViewerDistrictEvaluatorOptions;