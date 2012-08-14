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
     * @property {Object} Shortcut to the prototype object.
     */
    EventEmitter.fn = EventEmitter.prototype;

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     *
     * @param {String} evt Name of the event to return the listeners from.
     * @returns {Function[]} All listener functions for the event.
     */
    EventEmitter.fn.getListeners = function(evt) {
        // Create a shortcut to the storage object
        // Initialise it if it does not exists yet
        var events = this._events || (this._events = {});

        // Return the listener array
        // Initialise it if it does not exist
        return events[evt] || (events[evt] = []);
    };

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