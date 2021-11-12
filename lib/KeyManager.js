const Configstore = require('configstore');
const { name } = require('../package.json');

class KeyManager {
  constructor() {
    this.conf = new Configstore(name);
  }

  setAPIKey(key) {
    this.conf.set('APIkey', key);
    return key;
  }

  setAPSecret(key) {
    this.conf.set('APIsecret', key);
    return key;
  }

  showKey() {
    const APIkey = this.conf.get('APIkey');
    const APIsecret = this.conf.get('APIsecret');

    if (!APIsecret) {
      throw new Error('No API secret Found!');
    }

    if (!APIkey) {
      throw new Error('No API key Found!');
    }

    return { APIkey, APIsecret };
  }

  deleteKey() {
    const APIkey = this.conf.get('APIkey');
    const APIsecret = this.conf.get('APIsecret');

    this.conf.delete('APIsecret');
    this.conf.delete('APIkey');

    return { APIkey, APIsecret };
  }
}

module.exports = KeyManager;
