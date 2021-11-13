const axios = require('axios');
const colors = require('colors');
const moment = require('moment');
class Crypto {
  constructor() {
    this.baseUrl = 'https://api.binance.com/api/v3/ticker/price';
  }

  async buyCrypto(binance, { per, sym, qty }) {
    try {
      await binance.useServerTime();
      const res = await axios.get(`${this.baseUrl}`, {
        params: { symbol: sym.toUpperCase() }
      });

      const currentPrice = res.data.price;
      const pricetoBuy = (
        ((100 - parseFloat(per)) * currentPrice) /
        100
      ).toFixed(8);

      await binance.balance((err, bal) => {
        if (err) {
          console.log(err);
        } else {
          const curBalance = bal.BUSD.available;
          const amountRnd = Math.floor(curBalance / pricetoBuy);
          binance.buy(
            sym.toUpperCase(),
            amountRnd,
            pricetoBuy,
            { type: 'LIMIT' },
            (err, res) => {
              if (err) {
                console.error(err.body.red);
              } else {
                console.info(
                  `Successfully added Buy \nPrice : ${res.price}`.green
                );
              }
            }
          );
        }
        return;
      });

      return;
    } catch (err) {
      handleAPIError(err);
    }
  }

  async sellCrypto(binance, { per, sym, qty }) {
    try {
      await binance.useServerTime();
      const res = await axios.get(`${this.baseUrl}`, {
        params: { symbol: sym.toUpperCase() }
      });

      const currentPrice = res.data.price;
      const pricetoSell = await (
        ((100 + parseFloat(per)) * currentPrice) /
        100
      ).toFixed(8);

      await binance.balance((err, bal) => {
        if (err) {
          console.log(err);
        } else {
          const curBalance = bal.SHIB.available;
          const amountRnd = Math.floor(curBalance);
          binance.sell(
            sym.toUpperCase(),
            amountRnd,
            pricetoSell,
            { type: 'LIMIT' },
            (err, res) => {
              if (err) {
                console.error(err.body.red);
              } else {
                console.info(
                  `Successfully added Sell \nPrice : ${res.price}`.green
                );
              }
            }
          );
        }
        return;
      });
      return;
    } catch (err) {
      handleAPIError(err);
    }
  }

  async cancelTrade(binance, { sym }) {
    try {
      await binance.useServerTime();
      await binance.cancelAll(sym.toUpperCase(), (err, res) => {
        if (err) {
          console.info('No pending trade');
        } else {
          console.info('Successfully cancel trade'.green);
          console.info(`Previous trade [${res[0].side}]`.blue);
        }
      });
      return;
    } catch (err) {
      handleAPIError(err);
    }
  }

  async listTrade(binance) {
    try {
      await binance.useServerTime();
      await binance.openOrders(false, (err, res) => {
        if (err) {
          console.error(err.body.red);
        } else {
          console.log(`SYMBOL\t\tPRICE\t\tQUANTITY\tSIDE`.blue);
          res.forEach((t) => {
            if (t.side === 'SELL') {
              console.log(
                `${t.symbol}\t${t.price}\t${t.origQty}\t${t.side}`.red
              );
            } else {
              console.log(
                `${t.symbol}\t${t.price}\t${t.origQty}\t${t.side}`.green
              );
            }
          });
          return;
        }
      });
      return;
    } catch (err) {
      handleAPIError(err);
    }
  }

  async historyTrade(binance, { sym }) {
    try {
      await binance.useServerTime();
      await binance.trades(sym.toUpperCase(), (err, res, symbol) => {
        if (err) {
          console.error(err.body.red);
          return;
        } else {
          console.log(`Symbol\tAmount\tTime\t\tQuantity\tPrice`);

          res
            .reverse()
            .slice(0, 30)
            .forEach((t) => {
              const time = moment(t.time).format('DD/MM h:mm a');
              const qty = parseFloat(t.quoteQty).toFixed(2);
              parseFloat(t.quoteQty).toFixed(2);

              const output = `${t.symbol} ${qty}\t${time}\t${t.qty}\t${t.price}`;
              if (t.isBuyer) {
                console.log(output.green);
              } else {
                console.log(output.red);
              }
            });
          return;
        }
      });
      return;
    } catch (err) {
      handleAPIError(err);
    }
  }

  async balance(binance, { cur }) {
    try {
      await binance.useServerTime();
      await binance.balance((err, balances) => {
        if (err) {
          console.error(err.body.red);
          return;
        } else {
          console.info(`${cur} Balance :`, balances[cur].available.blue);
          console.info(`${cur} On Order :`, balances[cur].onOrder.blue);
        }
      });
      return;
    } catch (err) {
      handleAPIError(err);
    }
  }
}

function handleAPIError(err) {
  throw new Error(err);
}
module.exports = Crypto;
