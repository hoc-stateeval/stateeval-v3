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
 
  const { data: evaluations } = useGetEvaluationsForDistrictViewerQuery({
    workAreaContextId: activeWorkAreaContext.id,
    schoolCode: '',
  }, {skip: activeDistrictViewerEvaluatorId==="0"});

  return (
    <>
      <DistrictViewerEvaluatorDropDown  />
      <EvaluatingDropDown evaluations={evaluations} />
    </>
  );
};

export default DistrictViewerDistrictEvaluatorOptions;