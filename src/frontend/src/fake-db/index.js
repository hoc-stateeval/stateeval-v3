import './db/framework-db';
import './db/workarea-context-db';
import './db/local-login-db';
import './db/auth-db';
import './db/assignments-db';
import mock from './mock';

mock.onAny().passThrough();
