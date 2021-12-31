import { get } from '../../../core/api';
import { 
  WorkAreas,
  TeacherAssignmentWorkAreas,
  PrincipalAssignmentWorkAreas,
 } from '../../../core/workAreas';

 import { 
  WorkState,
 } from '../../../core/workState';

 const initAssignmentData = () => {
   return {
    evaluatees: [],
    principals: [],
    districtWideTeacherEvaluators: [],
    headPrincipals: [],
    districtEvaluators: [],
    evaluators: [],

    dteAssignmentRequests: [],
    acceptedDTEAssignmentRequests: [],

    delegated: false,

    assignmentGridIsReadOnly: false,
    dteGridIsReadOnly: false,

    assignedCount: 0,
    unassignedCount: 0,
    totalCount: 0,
    evaluationLocked: [],
    dteAssigned: [],
   }
 }

 const findDTEForTeacher = (districtWideTeacherEvaluators, evaluation) => {
  return districtWideTeacherEvaluators.find(x=>x.id === evaluation.evaluatorId);
}

const findHeadPrincipalsThatCanEvaluatePrincipal = (principal, headPrincipals, evaluation, assignmentData) => {
  var potentialEvaluators = [];
  principal.buildingRoles.forEach( (principalBuildingRole) => {
      headPrincipals.forEach( (headPrincipal) => {
        if (headPrincipal.buildingRoles.find(x=>x.schoolCode === principalBuildingRole.schoolCode)) {
          if (!potentialEvaluators.find(x=>x.id === headPrincipal.id)) {
            potentialEvaluators.push(headPrincipal);
          }
        }
      })
  });

  return potentialEvaluators;
}

const findPrincipalsThatCanEvaluateTeacher = (teacher, principals, evaluation, assignmentData) => {
  var potentialEvaluators = [];
  teacher.buildingRoles.forEach( (teacherBuildingRole) => {
      principals.forEach( (principal) => {
        if (principal.buildingRoles.find(x=>x.schoolCode === teacherBuildingRole.schoolCode)) {
          if (!potentialEvaluators.find(x=>x.id === principal.id)) {
            potentialEvaluators.push(principal);
          }
        }
      })
  });

  return potentialEvaluators;
}

const buildAssignmentData = async (workAreaContext, schoolCode, schoolName, data) => {

  let assignmentData = initAssignmentData();

  assignmentData.dteGridIsReadOnly = !workAreaContext.isDistrictAdmin;
  // the user is either from a school and coming directly to this page,
  // or from a district and drilling down to this page
  if (workAreaContext.schoolCode) {
    assignmentData.schoolCode = workAreaContext.schoolCode;
    assignmentData.schoolName = workAreaContext.schoolName;
  }
  else {
      assignmentData.schoolCode = schoolCode;
      assignmentData.schoolName = schoolName;
  }

  // TODO:
  // assignmentData.assignmentGridIsReadOnly = impersonating ||
  // (!data.delegated && !workAreaContext.isDistrictAdmin);

  assignmentData.evaluatees = data.evaluatees;
  assignmentData.evaluationSummaries = data.evaluationSummaries;

  for (const evaluatee of assignmentData.evaluatees) {
    const evaluation = assignmentData.evaluationSummaries.find(x=>x.evaluateeId===evaluatee.id);

    data.evaluatorRoleTypes.reduce((acc, next)=> {
      
    })

    if (TeacherAssignmentWorkAreas.includes(workAreaContext.tagName)) { 
      const dte = findDTEForTeacher(data.districtWideTeacherEvaluators, evaluatee);
      if (dte) {
        assignmentData.evaluators[evaluatee.id].push(dte);
        assignmentData.dteAssigned[evaluatee.id] = dte;
      }
      else {
        const principals = findPrincipalsThatCanEvaluateTeacher(evaluatee, data.principals, evaluation, assignmentData);
        assignmentData.evaluators[evaluatee.id] = [...principals];
      }
    }
    else if (PrincipalAssignmentWorkAreas.includes(workAreaContext.tagName)) {
      const headPrincipals = findHeadPrincipalsThatCanEvaluatePrincipal(evaluatee, data.headPrincipals, evaluation, assignmentData);
      assignmentData.evaluators[evaluatee.id] = [...headPrincipals, ...data.districtEvaluators];
    }

    assignmentData.evaluationLocked[evaluatee.id] = evaluation.wfState > WorkState.EVAL_DRAFT;
  }

  return assignmentData;

};

export default buildAssignmentData;