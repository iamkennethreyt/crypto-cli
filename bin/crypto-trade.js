const program = require('commander');
const crypto = require('../commands/crypto');

program
  .command('buy')
  .description('buy crypto')
  .option('--sym <symbol>', 'symbol of exchange crypto', 'SHIBBUSD')
  .option('--qty <quantity>', 'Amount of crypto to trade', 0)
  .option('--per <percent>', 'Percent of crypto per current price', 1)
  .action((cmd) => crypto.buy(cmd));

program
  .command('sell')
  .description('sell crypto')
  .option('--sym <symbol>', 'symbol of exchange crypto', 'SHIBBUSD')
  .option('--qty <quantity>', 'Amount of crypto to trade', 0)
  .option('--per <percent>', 'Percent of crypto per current price', 1)
  .action((cmd) => crypto.sell(cmd));

program
  .command('cancel')
  .description('cancel trade')
  .option('--sym <symbol>', 'symbol of exchange crypto', 'SHIBBUSD')
  .action((cmd) => crypto.cancel(cmd));

program
  .command('list')
  .description('list trade')
  .action(() => crypto.list());

program.parse(process.argv);

// If no args, output help
if (!process.argv[2]) {
  program.outputHelp();
}
