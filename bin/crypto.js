#!/usr/bin/env node

const program = require('commander');
const { version } = require('../package.json');

program
  .version(version)
  .command('api', 'Manage API Key')
  .command('trade', 'Trade your crypto')
  .command('bal', 'Current Balance')
  .command('hist', 'Trade History')
  .command('play', 'Trade your crypto')
  .parse(process.argv);
