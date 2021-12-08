
import mock from '../mock';
const assignmentsDB = {
  assignmentSummaries: [
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
};

mock.onGet(/\/api\/assignments\/\d+/).reply((config) => {
  const frameworkContextId = parseInt(config.url.split('/')[3], 10);
  const result = assignmentsDB.assignmentSummaries.find(
    (x) => x.frameworkContextId === frameworkContextId
  );
  return [200, result.summaries];
});

mock.onPut(/\/api\/assignments\/\d+\/delegate/).reply((config) => {
  const frameworkContextId = parseInt(config.url.split('/')[3], 10);
  const result = assignmentsDB.assignmentSummaries.find(
    (x) => x.frameworkContextId === frameworkContextId
  );
  for (let next of result.summaries) {
    next.delegated = true;
  }
  return [200];
});