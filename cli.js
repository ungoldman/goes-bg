#!/usr/bin/env node

const goesBG = require('./')
const cliclopts = require('cliclopts')
const minimist = require('minimist')
const pkg = require('./package.json')

const allowedOptions = [
  {
    name: 'outfile',
    abbr: 'o',
    help: 'Location to save image. (default: ~/Pictures/goes-bg/$TIMESTAMP.jpg)'
  },
  {
    name: 'help',
    abbr: 'h',
    help: 'Show help.',
    boolean: true
  }
]

const opts = cliclopts(allowedOptions)
const argv = minimist(process.argv.slice(2), opts.options())

if (argv.version) {
  console.log(pkg.version)
  process.exit()
}

if (argv.help) {
  console.log('Usage: goes-bg [options]\n')
  opts.print()
  process.exit()
}

goesBG(argv)
