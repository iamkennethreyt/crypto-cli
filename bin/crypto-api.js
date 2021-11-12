const program = require('commander');
const { setAPIkey, showKey, remove, setAPIsecret } = require('../commands/key');

program.command('set-key').description('Set your API Key').action(setAPIkey);
program
  .command('set-secret')
  .description('Set your API Secret')
  .action(setAPIsecret);
program.command('show').description('Show your API Key').action(showKey);
program.command('remove').description('Remove your API Key').action(remove);

program.parse(process.argv);
