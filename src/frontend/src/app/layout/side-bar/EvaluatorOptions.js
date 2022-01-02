
import {
  useGetEvaluationsForWorkAreaContextQuery,
 } from '../../core/apiSlice';

 import EvaluatingDropDown from './EvaluatingDropDown';

const EvaluatorOptions = (workAreaContext) => {

  const { data: evaluations } = useGetEvaluationsForWorkAreaContextQuery(workAreaContext.id);

  return (
    <>
      <EvaluatingDropDown evaluations={evaluations} />
    </>
  );
};

export default EvaluatorOptions;