
import mock from '../mock';
const assignmentsDB = {
  teacherAssignmentsSummaryForDistrict: [
    {
      frameworkContextId: 1,
      summaries: [
        {
          "schoolName": "DAN SD School 1",
          "schoolCode": "10001",
          "totalCount": 4,
          "assignedCount": 4,
          "unassignedCount": 0,
          "delegated": false,
          "pendingDTERequestCount": 0,
          "principalNames": [
            "Principal A DAN SD School 1",
            "Principal B DAN SD School 1"
          ],
        },
        {
          "schoolName": "DAN SD School 2",
          "schoolCode": "10002",
          "totalCount": 4,
          "assignedCount": 4,
          "unassignedCount": 0,
          "delegated": false,
          "pendingDTERequestCount": 0,
          "principalNames": [
            "Principal A DAN SD School 2",
            "Principal B DAN SD School 2"
          ],
        }

      ]
    }
],
  teacherAssignmentsSummaryForSchool: [
    {
      frameworkContextId: 1,
      schoolCode: '10001',
      "evaluationSummaries": [
        {
          "id": 1,
          "evaluateeId": 1,
          "evaluatorId": 49,
          "evaluationType": 2,
          "evaluationTypeDisplayName": "Teacher",
          "profileImageUrl": "",
          "evaluateeDisplayName": "Teacher A DAN SD School 1",
          "evaluatorDisplayName": "Principal A DAN SD School 1",
          "wfState": 1,
          "wfStateDisplayName": "Draft",
          "lockDateTime": null,
          "planType": 1,
          "planTypeDisplayName": "Comprehensive",
          "performanceLevel": null,
          "studentGrowthImpactRating": null,
          "comprehensiveCarryForward": false,
          "comprehensiveCarryForwardPerformanceLevel": null,
          "comprehensiveCarryForwardSchoolYear": null,
          "focusedFrameworkNodeId": null,
          "focusedFrameworkNodeDisplayName": "",
          "focusedSGFrameworkNodeId": null,
          "focusedSGFrameworkNodeDisplayName": "",
          "modifiedCompFocusedFrameworkNode2Id": null,
          "modifiedCompFocusedFrameworkNode2DisplayName": "",
          "lastYearEvaluateePlanType": 1,
          "nextYearEvaluateePlanType": null,
          "lastYearFocusedFrameworkNodeShortName": null,
          "lastYearFocusedSGframeworkNodeShortName": null,
          "suggestedEvaluateePlanType": 1,
          "suggestedFocusedFrameworkNodeShortName": null,
          "suggestedFocusedSgframeworkNodeShortName": null
        },
        {
          "id": 2,
          "evaluateeId": 2,
          "evaluatorId": 49,
          "evaluationType": 2,
          "evaluationTypeDisplayName": "Teacher",
          "profileImageUrl": "",
          "evaluateeDisplayName": "Teacher B DAN SD School 1",
          "evaluatorDisplayName": "Principal A DAN SD School 1",
          "wfState": 1,
          "wfStateDisplayName": "Draft",
          "lockDateTime": null,
          "planType": 1,
          "planTypeDisplayName": "Comprehensive",
          "performanceLevel": null,
          "studentGrowthImpactRating": null,
          "comprehensiveCarryForward": false,
          "comprehensiveCarryForwardPerformanceLevel": null,
          "comprehensiveCarryForwardSchoolYear": null,
          "focusedFrameworkNodeId": null,
          "focusedFrameworkNodeDisplayName": "",
          "focusedSGFrameworkNodeId": null,
          "focusedSGFrameworkNodeDisplayName": "",
          "modifiedCompFocusedFrameworkNode2Id": null,
          "modifiedCompFocusedFrameworkNode2DisplayName": "",
          "lastYearEvaluateePlanType": 2,
          "nextYearEvaluateePlanType": null,
          "lastYearFocusedFrameworkNodeShortName": "C1",
          "lastYearFocusedSGframeworkNodeShortName": "C3",
          "suggestedEvaluateePlanType": 2,
          "suggestedFocusedFrameworkNodeShortName": "C3",
          "suggestedFocusedSgframeworkNodeShortName": "C3"
        },
        {
          "id": 3,
          "evaluateeId": 3,
          "evaluatorId": 49,
          "evaluationType": 2,
          "evaluationTypeDisplayName": "Teacher",
          "profileImageUrl": "",
          "evaluateeDisplayName": "Teacher C DAN SD School 1",
          "evaluatorDisplayName": "Principal A DAN SD School 1",
          "wfState": 1,
          "wfStateDisplayName": "Draft",
          "lockDateTime": null,
          "planType": 1,
          "planTypeDisplayName": "Comprehensive",
          "performanceLevel": null,
          "studentGrowthImpactRating": null,
          "comprehensiveCarryForward": false,
          "comprehensiveCarryForwardPerformanceLevel": null,
          "comprehensiveCarryForwardSchoolYear": null,
          "focusedFrameworkNodeId": null,
          "focusedFrameworkNodeDisplayName": "",
          "focusedSGFrameworkNodeId": null,
          "focusedSGFrameworkNodeDisplayName": "",
          "modifiedCompFocusedFrameworkNode2Id": null,
          "modifiedCompFocusedFrameworkNode2DisplayName": "",
          "lastYearEvaluateePlanType": null,
          "nextYearEvaluateePlanType": null,
          "lastYearFocusedFrameworkNodeShortName": null,
          "lastYearFocusedSGframeworkNodeShortName": null,
          "suggestedEvaluateePlanType": null,
          "suggestedFocusedFrameworkNodeShortName": null,
          "suggestedFocusedSgframeworkNodeShortName": null
        },
        {
          "id": 4,
          "evaluateeId": 4,
          "evaluatorId": 49,
          "evaluationType": 2,
          "evaluationTypeDisplayName": "Teacher",
          "profileImageUrl": "",
          "evaluateeDisplayName": "Teacher D DAN SD School 1",
          "evaluatorDisplayName": "Principal A DAN SD School 1",
          "wfState": 1,
          "wfStateDisplayName": "Draft",
          "lockDateTime": null,
          "planType": 1,
          "planTypeDisplayName": "Comprehensive",
          "performanceLevel": null,
          "studentGrowthImpactRating": null,
          "comprehensiveCarryForward": false,
          "comprehensiveCarryForwardPerformanceLevel": null,
          "comprehensiveCarryForwardSchoolYear": null,
          "focusedFrameworkNodeId": null,
          "focusedFrameworkNodeDisplayName": "",
          "focusedSGFrameworkNodeId": null,
          "focusedSGFrameworkNodeDisplayName": "",
          "modifiedCompFocusedFrameworkNode2Id": null,
          "modifiedCompFocusedFrameworkNode2DisplayName": "",
          "lastYearEvaluateePlanType": null,
          "nextYearEvaluateePlanType": null,
          "lastYearFocusedFrameworkNodeShortName": null,
          "lastYearFocusedSGframeworkNodeShortName": null,
          "suggestedEvaluateePlanType": null,
          "suggestedFocusedFrameworkNodeShortName": null,
          "suggestedFocusedSgframeworkNodeShortName": null
        }
      ],
      "principals": [
        {
          "id": 49,
          "firstName": "Principal A",
          "lastName": "DAN SD School 1",
          "displayName": "Principal A DAN SD School 1",
          "email": "noop@noop.com",
          "userName": "Principal A DAN SD School 1",
          "profileImageUrl": ""
        },
        {
          "id": 50,
          "firstName": "Principal B",
          "lastName": "DAN SD School 1",
          "displayName": "Principal B DAN SD School 1",
          "email": "noop@noop.com",
          "userName": "Principal B DAN SD School 1",
          "profileImageUrl": ""
        },
        {
          "id": 52,
          "firstName": "Principal A",
          "lastName": "DAN SD School 2",
          "displayName": "Principal A DAN SD School 2",
          "email": "noop@noop.com",
          "userName": "Principal A DAN SD School 2",
          "profileImageUrl": ""
        },
        {
          "id": 53,
          "firstName": "Principal B",
          "lastName": "DAN SD School 2",
          "displayName": "Principal B DAN SD School 2",
          "email": "noop@noop.com",
          "userName": "Principal B DAN SD School 2",
          "profileImageUrl": ""
        }
      ],
      "districtWideTeacherEvaluators": [
        {
          "id": 89,
          "firstName": "District-wide Teacher Evaluator",
          "lastName": "DAN SD",
          "displayName": "District-wide Teacher Evaluator DAN SD",
          "email": "noop@noop.com",
          "userName": "District-wide Teacher Evaluator DAN SD",
          "profileImageUrl": ""
        }
      ],
      "delegated": false
    }
  ]
};

mock.onGet(/\/api\/assignments\/tr-assignments-summary\/\d+/).reply((config) => {
  const frameworkContextId = parseInt(config.url.split('/')[4], 10);
  const result = assignmentsDB.teacherAssignmentsSummaryForDistrict.find(
    (x) => x.frameworkContextId === frameworkContextId
  );
  return [200, result.summaries];
});

mock.onPut(/\/api\/assignments\/\d+\/delegate/).reply((config) => {
  const frameworkContextId = parseInt(config.url.split('/')[3], 10);
  const result = assignmentsDB.teacherAssignmentsSummaryForDistrict.find(
    (x) => x.frameworkContextId === frameworkContextId
  );
  for (let next of result.summaries) {
    next.delegated = true;
  }
  return [200];
});

mock.onGet(/\/api\/assignments\/tr-assignments-summary\/assignments-detail\/\d+/).reply((config) => {
  const parts = config.url.split('/');
  const frameworkContextId = parseInt(parts[5], 10);
  const schoolCode = parts[6];
  const result = assignmentsDB.teacherAssignmentsSummaryForSchool.find(
    (x) => x.frameworkContextId === frameworkContextId && x.schoolCode === schoolCode
  );
  return [200, result];
});