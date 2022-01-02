import { useSelector } from 'react-redux';
import EvaluatingDropDown from './EvaluatingDropDown';
import DistrictViewerSchoolDropDown from './DistrictViewerSchoolDropDown';
import DistrictViewerEvaluatorDropDown from './DistrictViewerEvaluatorDropDown';

import {
  useGetEvaluationsForDistrictViewerQuery,
 } from '../../core/apiSlice';

 import {
  selectActiveWorkAreaContext,
  selectActiveDistrictViewerSchoolCode,
  selectActiveDistrictViewerEvaluatorId,
} from '../../store/stateEval/userContextSlice';

const DistrictViewerSchoolEvaluatorOptions = () => {

  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  const activeDistrictViewerSchoolCode = useSelector(selectActiveDistrictViewerSchoolCode);
  const activeDistrictViewerEvaluatorId = useSelector(selectActiveDistrictViewerEvaluatorId);
 
  const { data: evaluations } = useGetEvaluationsForDistrictViewerQuery({
    workAreaContextId: activeWorkAreaContext.id,
    schoolCode: activeDistrictViewerSchoolCode,
  }, {skip: activeDistrictViewerEvaluatorId==="0"});

  return (
    <>
      <DistrictViewerSchoolDropDown />
      <DistrictViewerEvaluatorDropDown  />
      <EvaluatingDropDown evaluations={evaluations} />
    </>
  );
};

export default DistrictViewerSchoolEvaluatorOptions;