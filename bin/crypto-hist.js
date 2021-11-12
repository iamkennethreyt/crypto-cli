const program = require('commander');
const crypto = require('../commands/crypto');

program
  .option('--sym <symbol>', 'symbol of exchange crypto', 'SHIBBUSD')
  .action((cmd) => crypto.history(cmd));

program.parse(process.argv);

// If no args, output help
if (!process.argv[2]) {
  program.outputHelp();
}
