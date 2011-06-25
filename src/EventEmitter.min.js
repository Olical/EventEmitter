/*
 EventEmitter v2.0.0

 Copyright 2011, Oliver Caldwell (olivercaldwell.co.uk)
 Dual licensed under the MIT or GPL Version 2 licenses.
 https://github.com/Wolfy87/EventEmitter
*/
function EventEmitter(){var b=this,c={},d=null,e=null,f=null;b.addListener=function(a,d){c[a]?c[a].push(d):c[a]=[d];b.emit("newListener",a,d);return b};b.on=b.addListener;b.emit=function(a){if(c[a]){e=Array.prototype.slice.call(arguments,1);for(d=0;d<c[a].length;d+=1)c[a][d].apply(null,e)}return b};b.listeners=function(a){c[a]||(c[a]=[]);return c[a]};b.once=function(a,c){function d(){c.apply(null,arguments);b.removeListener(a,d)}b.addListener(a,d);return b};b.removeListener=function(a,e){if(c[a]){a:{var g=
c[a];if(g.indexOf)f=g.indexOf(e);else{for(d=0;d<g.length;d+=1)if(g[d]===e){f=d;break a}f=-1}}f!==-1&&c[a].splice(f,1)}else c[a]=[];return b};b.removeAllListeners=function(a){c[a]=[];return b}};
