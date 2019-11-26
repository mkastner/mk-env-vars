const tape = require('tape');
// const log = require('mk-log');
const EnvVars = require('../lib/index.js');

tape('test app deploy', function(t) {

  const app = EnvVars({ app: 'USERS', deploy: 'PRODUCTION' });

  // vars defined in package.json test
  t.equals(app.forName('NAME'), 'JohnGalt');
  t.equals(app.forName('PASSWORD'), '0000');

  t.end();

});

tape('test custom app deploy', function(t) {

  const app = EnvVars({ custom: 'GALT', app: 'USERS', deploy: 'PRODUCTION' });

  // vars defined in package.json test
  t.equals(app.forName('PASSWORD'), '0000');
  t.end();

});

