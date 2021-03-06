import { WorkArea } from '@lib/enums';
import { adminPaths, evaluationPaths, districtViewerPaths } from '@routes/paths';

const getDefaultPathForWorkAreaContext = (workAreaContext) => {
  switch (workAreaContext.tagName) {
    case WorkArea.DA_PR:
      return adminPaths.daPrDashboard;
    case WorkArea.DA_TR:
      return adminPaths.daTrDashboard;
    case WorkArea.DAM_PR:
      return adminPaths.assignmentsDistrictDetail;
    case WorkArea.DAM_TR:
      return adminPaths.assignmentsDistrictSummary;
    case WorkArea.SA_PR:
      return adminPaths.saPrDashboard;
    case WorkArea.SA_TR:
      return adminPaths.saTrDashboard;
    case WorkArea.DE:
      return evaluationPaths.deDashboard;
    case WorkArea.DTE:
      return evaluationPaths.dteDashboard;
    case WorkArea.PR_PR:
      return evaluationPaths.prPrDashboard;
    case WorkArea.PR_TR:
      return evaluationPaths.prTrDashboard;
    case WorkArea.PR_ME:
      return evaluationPaths.prMeDashboard;
    case WorkArea.TR_ME:
      return evaluationPaths.trMeDashboard;
    case WorkArea.CT:
      return evaluationPaths.ctDashboard;
    case WorkArea.DV_PR_PR:
      return districtViewerPaths.prPrDashboard;
    case WorkArea.DV_PR_TR:
      return districtViewerPaths.prTrDashboard;
    case WorkArea.DV_DTE:
      return districtViewerPaths.dteDashboard;
    case WorkArea.DV_DE:
      return districtViewerPaths.deDashboard;    
    case WorkArea.DV_CT:
      return districtViewerPaths.ctDashboard;
    default:
      throw Error(`getDefaultPathForWorkAreaContext: unknown workArea: ${workAreaContext.tagName}`);
  }
}

const EvaluatorWorkAreas = [WorkArea.PR_PR, WorkArea.PR_TR, WorkArea.DTE, WorkArea.DE];
const EvaluateeWorkAreas = [WorkArea.PR_ME, WorkArea.TR_ME];
const DistrictViewerSchoolEvaluatorWorkAreas = [WorkArea.DV_PR_TR, WorkArea.DV_PR_PR];
const DistrictViewerDistrictEvaluatorWorkAreas = [WorkArea.DV_DTE, WorkArea.DV_DE];
const DistrictViewerWorkAreas = [...DistrictViewerSchoolEvaluatorWorkAreas, ...DistrictViewerDistrictEvaluatorWorkAreas];

const EvaluationWorkAreas = [...EvaluatorWorkAreas, ...EvaluateeWorkAreas, ...DistrictViewerSchoolEvaluatorWorkAreas, DistrictViewerDistrictEvaluatorWorkAreas];
const AdminWorkAreas = [WorkArea.DA_TR, WorkArea.DA_PR, WorkArea.SA_TR, WorkArea.SA_PR];
const DistrictAdminWorkAreas = [WorkArea.DA_TR, WorkArea.DA_PR];
const TeacherAssignmentWorkAreas = [WorkArea.DA_TR, WorkArea.SA_TR, WorkArea.PR_TR];
const PrincipalAssignmentWorkAreas = [WorkArea.DA_PR, WorkArea.SA_PR, WorkArea.PR_PR, WorkArea.DE];

const isEvaluator = (workArea) => EvaluatorWorkAreas.includes(workArea.tagName);
const isEvaluatee = (workArea) => EvaluateeWorkAreas.includes(workArea.tagName);
const isEvaluationWorkArea = (workArea) => isEvaluator(workArea) || isEvaluatee(workArea);

export {
  EvaluatorWorkAreas,
  EvaluateeWorkAreas,
  EvaluationWorkAreas,
  isEvaluator, 
  isEvaluatee,
  isEvaluationWorkArea,
  AdminWorkAreas,
  DistrictAdminWorkAreas,
  TeacherAssignmentWorkAreas,
  PrincipalAssignmentWorkAreas,
  DistrictViewerSchoolEvaluatorWorkAreas,
  DistrictViewerDistrictEvaluatorWorkAreas,
  DistrictViewerWorkAreas,
  getDefaultPathForWorkAreaContext
};