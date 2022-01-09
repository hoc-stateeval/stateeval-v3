import { useSelector } from 'react-redux';

import {
  useGetEvaluationsForWorkAreaContextQuery,
 } from '../../../../core/apiSlice';

 import {
  selectActiveWorkAreaContext,
} from '../../../../store/stateEval/userContextSlice';

 import { EvaluatingDropDown } from '../../components';

export const EvaluatorOptions = () => {

  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);

  const { data: evaluations } = useGetEvaluationsForWorkAreaContextQuery(activeWorkAreaContext.id);

  return (
    <>
      <EvaluatingDropDown evaluations={evaluations} />
    </>
  );
};

