import { useSelector } from 'react-redux';

import {
  useGetEvaluationsForWorkAreaContextQuery,
 } from '@store/apiSlice';

 import {
  selectActiveWorkAreaContext,
} from '@store/stateEval/userContextSlice';

 import EvaluatingDropDown from './EvaluatingDropDown';

const EvaluatorOptions = () => {

  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);

  const { data: evaluations } = useGetEvaluationsForWorkAreaContextQuery(activeWorkAreaContext.id);

  return (
    <>
      <EvaluatingDropDown evaluations={evaluations} />
    </>
  );
};

export default EvaluatorOptions;

