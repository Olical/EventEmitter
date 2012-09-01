#!/bin/bash
node_modules/.bin/uglifyjs -o dist/EventEmitter-${1-dev}.min.js EventEmitter.js