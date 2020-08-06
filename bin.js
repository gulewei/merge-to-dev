#!/usr/bin/env node
const { argv } = require('yargs');
const mergeToDev = require('./index');
const pkg = require('./package.json');

const { msg, target } = argv;

console.log('argv', JSON.stringify(argv));
mergeToDev(msg, target);
