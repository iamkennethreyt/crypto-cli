const program = require('commander');
const play = require('../commands/play');

program.description('play crypto').action(() => play());

program.parse(process.argv);

// If no args, output help
if (!process.argv[2]) {
  program.outputHelp();
}
