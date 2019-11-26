const tape = require('tape');
//const log = require('mk-log');
const EnvVars = require('../lib/index.js');

tape('test envVars deploy', function(t) {

  const envVars = EnvVars({ app: 'USERS', deploy: 'TEST' });

  // vars defined in package.json test
  t.equals(envVars.forName('NAME'), 'JohnGalt');
  t.equals(envVars.forName('PASSWORD'), '0000');

  t.end();

});

tape('test custom app deploy', function(t) {

  const envVars = EnvVars({ custom: 'GALT', app: 'USERS', deploy: 'TEST' });

  // vars defined in package.json test
  t.equals(envVars.forName('PASSWORD'), '0000');
  t.end();

});

tape('test throws error because of env is matching env vars deploy', function(t) {

  const envVars = EnvVars({ custom: 'GALT', app: 'USERS', deploy: 'TEST' });

  // vars defined in package.json test
  try { 
    envVars.forName('NOT_THERE');
  } catch (err) {
    t.ok(err.toString().match(/GALT_USERS_NOT_THERE_TEST/));
  } finally {
    t.end();
  }
  

});

tape('test does not throw error because of wrong env', function(t) {

  const envVars = EnvVars({ custom: 'GALT', app: 'USERS', deploy: 'TEST' });

  // vars defined in package.json test
  try { 
    envVars.forName('NOT_THERE');
  } catch (err) {
    t.ok(err.toString().match(/GALT_USERS_NOT_THERE_TEST/));
  } finally {
    t.end();
  }
  

});
