const program = require('commander');
const crypto = require('../commands/crypto');

program
  .description('crypto balance')
  .option('--cur <currency>', 'currency', 'BUSD')
  .action((cmd) => crypto.balance(cmd));

program.parse(process.argv);

// If no args, output help
if (!process.argv[2]) {
  program.outputHelp();
}
