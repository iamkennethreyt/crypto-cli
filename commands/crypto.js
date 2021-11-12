const KeyManager = require('../lib/KeyManager');
const Crypto = require('../lib/Crypto');
const Binance = require('node-binance-api');

keyManager = new KeyManager();
const { APIkey, APIsecret } = keyManager.showKey();
const ct = new Crypto(APIkey, APIsecret);

const binance = new Binance().options({
  APIKEY: APIkey,
  APISECRET: APIsecret
  // recvWindow: 8000
});

const crypto = {
  async buy({ per, sym, qty }) {
    try {
      await ct.buyCrypto(binance, { sym, per, qty });
    } catch (err) {
      console.error(err.message.red);
    }
  },

  async sell({ per, sym, qty }) {
    try {
      await ct.sellCrypto(binance, { sym, per, qty });
    } catch (err) {
      console.error(err.message.red);
    }
  },

  async cancel({ sym }) {
    try {
      await ct.cancelTrade(binance, { sym });
    } catch (err) {
      console.error(err.message.red);
    }

    return;
  },

  async list() {
    try {
      await ct.listTrade(binance);
    } catch (err) {
      console.error(err.message.red);
    }
  },

  async history({ sym }) {
    try {
      await ct.historyTrade(binance, { sym });
    } catch (err) {
      console.error(err.message.red);
    }
  },

  async balance({ cur }) {
    try {
      await ct.balance(binance, { cur });
    } catch (err) {
      console.error(err.message.red);
    }
  }
};

module.exports = crypto;
