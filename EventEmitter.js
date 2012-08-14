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

    /**
     * Finds the index of the listener for the event in it's storage array
     *
     * @param {String} evt Name of the event to look in.
     * @param {Function} listener Method to look for.
     * @returns {Number} Index of the specified listener, -1 if not found
     */
    EventEmitter.fn.indexOfListener = function(evt, listener) {
        // Fetch the listeners
        var listeners = this.getListeners(evt);

        // Return the index via the native method if possible
        if(Array.prototype.indexOf) {
            return listeners.indexOf(listener);
        }

        // There is no native method
        // Use a manual loop to find the index
        for(var i = listeners.length; i--;) {
            // If the listener matches, return it's index
            if(listeners[i] === listener) {
                return listener;
            }
        }

        // Default to returning -1
        return -1;
    };

    /**
     * Adds a listener function to the specified event.
     *
     * @param {String} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted.
     * @returns {Object} Current instance of EventEmitter for chaining.
     */
    EventEmitter.fn.addListener = function(evt, listener) {
        // Get the listener array for the event and push the listener into it
        this.getListeners(evt).push(listener);

        // Return the instance of EventEmitter to allow chaining
        return this;
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