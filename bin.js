#!/usr/bin/env node
const { argv } = require('yargs');
const mergeToDev = require('./index');
const pkg = require('./package.json');

mergeToDev(argv);
