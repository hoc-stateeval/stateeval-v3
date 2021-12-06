import mock from '../mock';

const localLoginDB = {
  districts: [
    {
      id: 1,
      name: 'DAN SD',
      districtCode: '10000',
      schools: [
        {
          id: 7,
          schoolName: 'DAN SD School 1',
          schoolCode: '10001',
          districtCode: '10000',
        },
        {
          id: 8,
          schoolName: 'DAN SD School 2',
          schoolCode: '10002',
          districtCode: '10000',
        },
      ],
    },
    {
      id: 2,
      name: 'CEL SD',
      districtCode: '20000',
      schools: [
        {
          id: 9,
          schoolName: 'CEL SD School 1',
          schoolCode: '20001',
          districtCode: '20000',
        },
        {
          id: 10,
          schoolName: 'CEL SD School 2',
          schoolCode: '20002',
          districtCode: '20000',
        },
      ],
    },
    {
      id: 3,
      name: 'MAR SD',
      districtCode: '30000',
      schools: [
        {
          id: 11,
          schoolName: 'MAR SD School 1',
          schoolCode: '30001',
          districtCode: '30000',
        },
        {
          id: 12,
          schoolName: 'MAR SD School 2',
          schoolCode: '30002',
          districtCode: '30000',
        },
      ],
    },
    {
      id: 4,
      name: 'DAN SPS SD',
      districtCode: '17001',
      schools: [
        {
          id: 13,
          schoolName: 'DAN SPS SD School 1',
          schoolCode: '17001',
          districtCode: '17001',
        },
        {
          id: 14,
          schoolName: 'DAN SPS SD School 2',
          schoolCode: '17002',
          districtCode: '17001',
        },
      ],
    },
    {
      id: 5,
      name: 'CEL 2 SD',
      districtCode: '40000',
      schools: [
        {
          id: 15,
          schoolName: 'CEL 2 SD School 1',
          schoolCode: '40001',
          districtCode: '40000',
        },
        {
          id: 16,
          schoolName: 'CEL 2 SD School 2',
          schoolCode: '40002',
          districtCode: '40000',
        },
      ],
    },
    {
      id: 6,
      name: 'MAR 2 SD',
      districtCode: '50000',
      schools: [
        {
          id: 17,
          schoolName: 'MAR 2 SD School 1',
          schoolCode: '50001',
          districtCode: '50000',
        },
        {
          id: 18,
          schoolName: 'MAR 2 SD School 2',
          schoolCode: '50002',
          districtCode: '50000',
        },
      ],
    },
  ],
  users: [
    {
      "id": 85,
      "displayName": "District Admin DAN SD",
      "userName": "District Admin DAN SD",
      "districtCode": "10000",
      "schoolCode": "",
      "roleName": "District Admin"
    },
    {
      "id": 86,
      "displayName": "District Viewer DAN SD",
      "userName": "District Viewer DAN SD",
      "districtCode": "10000",
      "schoolCode": "",
      "roleName": "District Viewer"
    },
    {
      "id": 87,
      "displayName": "District Assignment Manager DAN SD",
      "userName": "District Assignment Manager DAN SD",
      "districtCode": "10000",
      "schoolCode": "",
      "roleName": "District Assignment Manager"
    },
    {
      "id": 88,
      "displayName": "District Evaluator DAN SD",
      "userName": "District Evaluator DAN SD",
      "districtCode": "10000",
      "schoolCode": "",
      "roleName": "District Evaluator"
    },
    {
      "id": 89,
      "displayName": "District-wide Teacher Evaluator DAN SD",
      "userName": "District-wide Teacher Evaluator DAN SD",
      "districtCode": "10000",
      "schoolCode": "",
      "roleName": "District-wide Teacher Evaluator"
    },
    {
      "id": 1,
      "displayName": "Teacher A DAN SD School 1",
      "userName": "Teacher A DAN SD School 1",
      "districtCode": "10000",
      "schoolCode": "10001",
      "roleName": "Teacher"
    },
    {
      "id": 2,
      "displayName": "Teacher B DAN SD School 1",
      "userName": "Teacher B DAN SD School 1",
      "districtCode": "10000",
      "schoolCode": "10001",
      "roleName": "Teacher"
    },
    {
      "id": 3,
      "displayName": "Teacher C DAN SD School 1",
      "userName": "Teacher C DAN SD School 1",
      "districtCode": "10000",
      "schoolCode": "10001",
      "roleName": "Teacher"
    },
    {
      "id": 4,
      "displayName": "Teacher D DAN SD School 1",
      "userName": "Teacher D DAN SD School 1",
      "districtCode": "10000",
      "schoolCode": "10001",
      "roleName": "Teacher"
    },
    {
      "id": 49,
      "displayName": "Principal A DAN SD School 1",
      "userName": "Principal A DAN SD School 1",
      "districtCode": "10000",
      "schoolCode": "10001",
      "roleName": "Principal"
    },
    {
      "id": 50,
      "displayName": "Principal B DAN SD School 1",
      "userName": "Principal B DAN SD School 1",
      "districtCode": "10000",
      "schoolCode": "10001",
      "roleName": "Principal"
    },
    {
      "id": 50,
      "displayName": "Principal B DAN SD School 1",
      "userName": "Principal B DAN SD School 1",
      "districtCode": "10000",
      "schoolCode": "10001",
      "roleName": "Head Principal"
    },
    {
      "id": 50,
      "displayName": "Principal B DAN SD School 1",
      "userName": "Principal B DAN SD School 1",
      "districtCode": "10000",
      "schoolCode": "10001",
      "roleName": "School Admin"
    },
    {
      "id": 51,
      "displayName": "School Admin DAN SD School 1",
      "userName": "School Admin DAN SD School 1",
      "districtCode": "10000",
      "schoolCode": "10001",
      "roleName": "School Admin"
    },
    {
      "id": 5,
      "displayName": "Teacher A DAN SD School 2",
      "userName": "Teacher A DAN SD School 2",
      "districtCode": "10000",
      "schoolCode": "10002",
      "roleName": "Teacher"
    },
    {
      "id": 6,
      "displayName": "Teacher B DAN SD School 2",
      "userName": "Teacher B DAN SD School 2",
      "districtCode": "10000",
      "schoolCode": "10002",
      "roleName": "Teacher"
    },
    {
      "id": 7,
      "displayName": "Teacher C DAN SD School 2",
      "userName": "Teacher C DAN SD School 2",
      "districtCode": "10000",
      "schoolCode": "10002",
      "roleName": "Teacher"
    },
    {
      "id": 8,
      "displayName": "Teacher D DAN SD School 2",
      "userName": "Teacher D DAN SD School 2",
      "districtCode": "10000",
      "schoolCode": "10002",
      "roleName": "Teacher"
    },
    {
      "id": 52,
      "displayName": "Principal A DAN SD School 2",
      "userName": "Principal A DAN SD School 2",
      "districtCode": "10000",
      "schoolCode": "10002",
      "roleName": "Principal"
    },
    {
      "id": 53,
      "displayName": "Principal B DAN SD School 2",
      "userName": "Principal B DAN SD School 2",
      "districtCode": "10000",
      "schoolCode": "10002",
      "roleName": "Principal"
    },
    {
      "id": 53,
      "displayName": "Principal B DAN SD School 2",
      "userName": "Principal B DAN SD School 2",
      "districtCode": "10000",
      "schoolCode": "10002",
      "roleName": "Head Principal"
    },
    {
      "id": 53,
      "displayName": "Principal B DAN SD School 2",
      "userName": "Principal B DAN SD School 2",
      "districtCode": "10000",
      "schoolCode": "10002",
      "roleName": "School Admin"
    },
    {
      "id": 54,
      "displayName": "School Admin DAN SD School 2",
      "userName": "School Admin DAN SD School 2",
      "districtCode": "10000",
      "schoolCode": "10002",
      "roleName": "School Admin"
    }
  ],
};

mock.onGet('/api/local-login/districts').reply((config) => {
  const response = localLoginDB.districts;
  return [200, response];
});

mock.onGet('/api/local-login/users').reply((config) => {
  const { districtCode } = config;
  const response = localLoginDB.users.filter((x) => x.districtCode === districtCode);
  return [200, response];
});
