import { useSelector } from "react-redux";

import { useGetEvaluationsForWorkAreaContextQuery } from "@api-slice";

import { selectActiveWorkAreaContext } from "@user-context-slice";

import EvaluatingDropDown from "./EvaluatingDropDown";

const EvaluatorOptions = () => {
  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);

  const { data: evaluations } = useGetEvaluationsForWorkAreaContextQuery(
    activeWorkAreaContext.id
  );

  return (
    <>
      <EvaluatingDropDown evaluations={evaluations} />
    </>
  );
};

export default EvaluatorOptions;
