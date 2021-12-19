const WorkAreas = {
  PR_TR: 'PR_TR',
  PR_ME: 'PR_ME',
  TR_ME: 'TR_ME',
  PR_PR: 'PR_PR',
  DE_PR: 'DE_PR',
  DTE: 'DTE',
  DA_TR: 'DA_TR',
  DA_PR: 'DA_PR',
  SA_TR: 'SA_TR',
  SA_PR: 'SA_PR',
  DV: 'DV',
};

const EvaluatorWorkAreas = [WorkAreas.PR_PR, WorkAreas.PR_TR, WorkAreas.DTE, WorkAreas.DE_PR];
const EvaluateeWorkAreas = [WorkAreas.PR_ME, WorkAreas.TR_ME];
const EvaluationWorkAreas = [...EvaluatorWorkAreas, ...EvaluateeWorkAreas];
const AdminWorkAreas = [WorkAreas.DA_TR, WorkAreas.DA_PR, WorkAreas.SA_TR, WorkAreas.SA_PR];
const DistrictAdminWorkAreas = [WorkAreas.DA_TR, WorkAreas.DA_PR];
const TeacherAssignmentWorkAreas = [WorkAreas.DA_TR, WorkAreas.SA_TR, WorkAreas.PR_TR];
const PrincipalAssignmentWorkAreas = [WorkAreas.DA_PR, WorkAreas.SA_PR, WorkAreas.PR_PR];

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
  AdminWorkAreas,
  DistrictAdminWorkAreas,
  TeacherAssignmentWorkAreas,
  PrincipalAssignmentWorkAreas
};