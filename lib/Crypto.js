const axios = require('axios');
const colors = require('colors');
const moment = require('moment');
class Crypto {
  constructor() {
    this.baseUrl = 'https://api.binance.com/api/v3/ticker/price';
  }

  async buyCrypto(binance, { per, sym, qty }) {
    try {
      const res = await axios.get(`${this.baseUrl}`, {
        params: { symbol: sym }
      });

      const currentPrice = res.data.price;
      const pricetoBuy = (
        ((100 - parseFloat(per)) * currentPrice) /
        100
      ).toFixed(8);

      binance.buy(sym, qty, pricetoBuy, { type: 'LIMIT' }, (err, res) => {
        if (err) {
          console.error(err.body.red);
        } else {
          console.info(`Successfully added Buy \nPrice : ${res.price}`.green);
        }
      });

      return;
    } catch (err) {
      handleAPIError(err);
    }
  }

  // async buyCrypto(binance, { per, sym, qty }) {
  //   try {
  //     const res = await axios.get(`${this.baseUrl}`, {
  //       params: { symbol: sym }
  //     });

  //     const currentPrice = res.data.price;
  //     const pricetoBuy = (
  //       ((100 - parseFloat(per)) * currentPrice) /
  //       100
  //     ).toFixed(8);

  //     await binance.balance((err, balances) => {
  //       if (err) {
  //         return err;
  //       } else {
  //         const quantity = Math.floor(balances.BUSD.available / pricetoBuy);
  //         console.log(quantity);
  //         console.log(pricetoBuy);

  //         const performed = async () =>
  //           await binance.buy(
  //             'SHIBBUSD',
  //             2048191,
  //             0.00005,
  //             { type: 'LIMIT' },
  //             (err, res) => {
  //               if (err) {
  //                 console.error(err);
  //               } else {
  //                 console.info(
  //                   `Successfully added Buy \nPrice : ${res.price}`.green
  //                 );
  //               }
  //             }
  //           );
  //         performed();
  //         return;
  //       }
  //     });

  //     return;
  //   } catch (err) {
  //     handleAPIError(err);
  //   }
  // }
  async sellCrypto(binance, { per, sym, qty }) {
    try {
      const res = await axios.get(`${this.baseUrl}`, {
        params: { symbol: sym }
      });

      const currentPrice = res.data.price;
      const pricetoBuy = await (
        ((100 + parseFloat(per)) * currentPrice) /
        100
      ).toFixed(8);

      binance.sell(sym, qty, pricetoBuy, { type: 'LIMIT' }, (err, res) => {
        if (err) {
          console.error(err.body.red);
        } else {
          console.info(`Successfully added Sell \nPrice : ${res.price}`.green);
        }
      });

      return;
    } catch (err) {
      handleAPIError(err);
    }
  }

  async cancelTrade(binance, { sym }) {
    try {
      await binance.cancelAll(sym, (err, res) => {
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
      await binance.trades(sym, (err, res, symbol) => {
        if (err) {
          console.error(err.body.red);
          return;
        } else {
          console.log(`Amount\tTime\t\tQuantity\tPrice`);

          res
            .reverse()
            .slice(0, 30)
            .forEach((t) => {
              const time = moment(t.time).format('DD/MM h:mm a');
              const qty = parseFloat(t.quoteQty).toFixed(2);
              parseFloat(t.quoteQty).toFixed(2);
              if (t.isBuyer) {
                console.log(`${qty}\t${time}\t${t.qty}\t${t.price}`.green);
              } else {
                console.log(`${qty}\t${time}\t${t.qty}\t${t.price}`.red);
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