#!/usr/bin/env node
const { argv } = require('yargs');
const mergeToDev = require('./index');

mergeToDev(argv);
