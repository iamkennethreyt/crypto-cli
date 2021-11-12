const inquirer = require('inquirer');
const colors = require('colors');
const KeyManager = require('../lib/KeyManager');
const { isRequired } = require('../utils/validation');

const key = {
  async setAPIkey() {
    const keyManager = new KeyManager();
    const input = await inquirer.prompt([
      {
        type: 'input',
        name: 'APIkey',
        message: 'Enter API Key : '.blue,
        validate: isRequired
      }
    ]);

    const key = keyManager.setAPIKey(input.APIkey);
    if (key) {
      console.log('API Key Set'.green);
    }
  },

  async setAPIsecret() {
    const keyManager = new KeyManager();
    const input = await inquirer.prompt([
      {
        type: 'input',
        name: 'APIsecret',
        message: 'Enter API Secret : '.blue,
        validate: isRequired
      }
    ]);

    const key = keyManager.setAPSecret(input.APIsecret);
    if (key) {
      console.log('API Key Secret'.green);
    }
  },

  showKey() {
    try {
      const keyManager = new KeyManager();
      const { APIkey, APIsecret } = keyManager.showKey();

      console.log('Current API Key: ', APIkey.blue);
      console.log('Current API Secret: ', APIsecret.blue);
      return { APIkey, APIsecret };
    } catch (err) {
      console.error(err.message.red);
    }
  },

  remove() {
    try {
      const keyManager = new KeyManager();
      keyManager.deleteKey();

      console.log('API Key and Secret Removed'.green);
      return;
    } catch (err) {
      console.error(err.message.red);
    }
  }
};

module.exports = key;
