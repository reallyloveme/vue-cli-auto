#!/usr/bin/env node
const program = require('commander') // commander库
program.version(require('../package.json').version)


program
.command('init <name>')
.description('init project ')
.action(require('../lib/init.js'))

program
.command('refresh')
.description('refresh router ')
.action(require('../lib/refresh.js'))

program
.command('add <name>')
.description('add view template ')
.action(require('../lib/addPage.js'))

program
.command('copy <name>')
.description('copy view template ')
.action(require('../lib/copied.js'))

program.parse(process.argv)