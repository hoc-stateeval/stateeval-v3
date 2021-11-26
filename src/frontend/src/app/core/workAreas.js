const WorkAreas = {
  PR_TR: 'PR_TR',
  PR_ME: 'PR_ME',
  TR_ME: 'TR_ME',
  PR_PR: 'PR_PR',
  DE_PR: 'DE_PR',
  DTE: 'DTE',
  DA: 'DA',
  SA: 'SA',
  DV: 'DV',
};

const EvaluatorWorkAreas = [WorkAreas.PR_PR, WorkAreas.PR_TR, WorkAreas.DTE, WorkAreas.DE_PR];
const EvaluateeWorkAreas = [WorkAreas.PR_ME, WorkAreas.TR_ME];
const EvaluationWorkAreas = [...EvaluatorWorkAreas, ...EvaluateeWorkAreas];

const isEvaluator = (workArea) => EvaluatorWorkAreas.includes(workArea.tagName);
const isEvaluatee = (workArea) => EvaluateeWorkAreas.includes(workArea.tagName);
const isEvaluationWorkArea = (workArea) => isEvaluator(workArea) || isEvaluatee(workArea);

export {
  WorkAreas,
  EvaluatorWorkAreas,
  EvaluateeWorkAreas,
  EvaluationWorkAreas,
  isEvaluator, 
  isEvaluatee,
  isEvaluationWorkArea,
};