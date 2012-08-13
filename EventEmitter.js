/**
 * EventEmitter v4.0.0 - https://github.com/Wolfy87/EventEmitter
 *
 * Copyright 2012 Oliver Caldwell - http://oli.me.uk/
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */

;(function(exports) {
    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class Manages event registering and emitting.
     */
    function EventEmitter(){}

    /**
     * Provides a shortcut to the prototype.
     *
     * @property {object} Shortcut to the prototype object.
     */
    EventEmitter.fn = EventEmitter.prototype;

    // Expose the class either via AMD or the global object
    if(typeof define === 'function' && define.amd) {
        define(function() {
            return EventEmitter;
        });
    }
    else {
        exports.EventEmitter = EventEmitter;
    }
}(this));