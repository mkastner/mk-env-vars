const log = require('mk-log');

function checkRequired(keys, options) {
  for (let i = 0, l = keys.length; i < l; i++) {
    let key = keys[i];
    let value = options[key];
    if (key.match(/name|deploy/)) {
      if (!value) {
        throw new Error(`Value for ${key} be set`); 
      } 
    }
  }
}

function checkAllowed(keys, options) {
  const optionKeys = Object.keys(options);

  for (let i = 0, l = optionKeys.length; i < l; i++) {
    let optionKey = optionKeys[i]; 
    if (keys.indexOf(optionKey) === -1) {
      throw new Error(`${optionKey} is not allowed as option key`);
    } 
  }

}

function buildVar(keys, options) {
  const varItems = [];
  for (let i = 0, l = keys.length; i < l; i++) {
    let optionKey = keys[i];
    let option = options[optionKey];
    if (option) {
      varItems.push(option); 
    } 
  }
  return varItems.join('_');
}

function EnvVars(options) {
  
  let keys = ['custom', 'app', 'deploy'];

  checkAllowed(keys, options);

  checkRequired(keys, options);

  return {
    
    forName(name) {
      if (!name) {
        throw new Error('No env var name passed');
      }
      
      const clonedKeys = JSON.parse(JSON.stringify(keys));
      const clonedOptions = JSON.parse(JSON.stringify(options));
     
      // insert name as second var
      clonedKeys.splice(2, 0, 'name');
      clonedOptions.name = name;
      const varName = buildVar(clonedKeys, clonedOptions);

      return process.env[varName]; 
    }
  };
}

module.exports = EnvVars;
