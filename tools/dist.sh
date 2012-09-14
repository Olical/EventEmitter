#!/bin/bash
node_modules/.bin/uglifyjs -o dist/EventEmitter.min.js EventEmitter.js
cp dist/EventEmitter.min.js dist/EventEmitter-${1-dev}.min.js