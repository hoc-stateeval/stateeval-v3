import _ from 'lodash';
import jwt from 'jsonwebtoken';
import mock from '../mock';
/* eslint-disable camelcase */

const jwtConfig = {
  secret: 'some-secret-code-goes-here',
  expiresIn: '2 days', // A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc)
};

const authDB = {
  users: [
    {
      id: 1,
      password: 'password',
      displayName: 'Teacher A DAN SD School 1',
      userName: 'Teacher A DAN SD School 1',
    },
    {
      id: 2,
      password: 'password',
      displayName: 'Teacher B DAN SD School 1',
      userName: 'Teacher B DAN SD School 1',
    },
    {
      id: 3,
      password: 'password',
      displayName: 'Teacher C DAN SD School 1',
      userName: 'Teacher C DAN SD School 1',
    },
    {
      id: 4,
      password: 'password',
      displayName: 'Teacher D DAN SD School 1',
      userName: 'Teacher D DAN SD School 1',
    },
    {
      id: 5,
      password: 'password',
      displayName: 'Teacher A DAN SD School 2',
      userName: 'Teacher A DAN SD School 2',
    },
    {
      id: 6,
      password: 'password',
      displayName: 'Teacher B DAN SD School 2',
      userName: 'Teacher B DAN SD School 2',
    },
    {
      id: 7,
      password: 'password',
      displayName: 'Teacher C DAN SD School 2',
      userName: 'Teacher C DAN SD School 2',
    },
    {
      id: 8,
      password: 'password',
      displayName: 'Teacher D DAN SD School 2',
      userName: 'Teacher D DAN SD School 2',
    },
    {
      id: 49,
      password: 'password',
      displayName: 'Principal A DAN SD School 1',
      userName: 'Principal A DAN SD School 1',
    },
    {
      id: 50,
      password: 'password',
      displayName: 'Principal A DAN SD School 1',
      userName: 'Principal B DAN SD School 1',
    },
    {
      id: 51,
      password: 'password',
      displayName: 'Principal A DAN SD School 1',
      userName: 'Principal A DAN SD School 1',
    },
    {
      id: 52,
      password: 'password',
      displayName: 'Principal A DAN SD School 1',
      userName: 'Principal B DAN SD School 1',
    },
    {
      id: 85,
      password: 'password',
      displayName: 'District Admin DAN SD',
      userName: 'District Admin DAN SD',
    },
    {
      id: 86,
      password: 'password',
      displayName: 'District Viewer DAN SD',
      userName: 'District Viewer DAN SD',
    },
    {
      id: 87,
      password: 'password',
      displayName: 'District Assignment Manager DAN SD',
      userName: 'District Assignment Manager DAN SD',
    },
    {
      id: 88,
      password: 'password',
      displayName: 'District Evaluator DAN SD',
      userName: 'District Evaluator DAN SD',
    },
    {
      id: 89,
      password: 'password',
      displayName: 'District-wide Teacher Evaluator DAN SD',
      userName: 'District-wide Teacher Evaluator DAN SD',
    },
  ],
};

mock.onGet('/api/auth').reply((config) => {
  const data = JSON.parse(config.data);
  const { userName, password } = data;
  const user = _.cloneDeep(
    authDB.users.find((_user) => _user.userName === userName)
  );
  const error = [];

  if (!user) {
    error.push({
      type: 'username',
      message: 'Check your username',
    });
  }

  if (user && user.password !== password) {
    error.push({
      type: 'password',
      message: 'Check your password',
    });
  }

  if (error.length === 0) {
    delete user.password;

    const access_token = jwt.sign({ id: user.id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    const response = {
      user,
      access_token,
    };

    return [200, response];
  }

  return [200, { error }];
});

mock.onGet('/auth/access-token').reply((config) => {
  const data = JSON.parse(config.data);
  const { access_token } = data;

  try {
    const { id } = jwt.verify(access_token, jwtConfig.secret);

    const user = _.cloneDeep(authDB.users.find((_user) => _user.id === id));
    delete user.password;

    const updatedAccessToken = jwt.sign({ id: user.uuid }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    const response = {
      user,
      access_token: updatedAccessToken,
    };

    return [200, response];
  } catch (e) {
    const error = 'Invalid access token detected';
    return [401, { error }];
  }
});
