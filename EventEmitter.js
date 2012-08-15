/**
 * EventEmitter v4.0.0 - https://github.com/Wolfy87/EventEmitter
 *
 * Copyright 2012 Oliver Caldwell - http://oli.me.uk/
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */

;(function(exports) {
    // JSHint config - http://www.jshint.com/
    /*global define:true*/

    // Place the script in strict mode
    'use strict';

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
     * @param {Function} listener Method to look for.
     * @param {Function[]} listeners Array of listeners to search through.
     * @returns {Number} Index of the specified listener, -1 if not found
     */
    EventEmitter.fn.indexOfListener = function(listener, listeners) {
        // Return the index via the native method if possible
        if(listeners.indexOf) {
            return listeners.indexOf(listener);
        }

        // There is no native method
        // Use a manual loop to find the index
        for(var i = listeners.length; i--;) {
            // If the listener matches, return it's index
            if(listeners[i] === listener) {
                return i;
            }
        }

        // Default to returning -1
        return -1;
    };

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     *
     * @param {String} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted.
     * @returns {Object} Current instance of EventEmitter for chaining.
     */
    EventEmitter.fn.addListener = function(evt, listener) {
        // Fetch the listeners
        var listeners = this.getListeners(evt);

        // Push the listener into the array if it is not already there
        if(this.indexOfListener(listener, listeners) === -1) {
            listeners.push(listener);
        }

        // Return the instance of EventEmitter to allow chaining
        return this;
    };

    /**
     * Removes a listener function from the specified event.
     *
     * @param {String} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @returns {Object} Current instance of EventEmitter for chaining.
     */
    EventEmitter.fn.removeListener = function(evt, listener) {
        // Fetch the listeners
        // And get the index of the listener in the array
        var listeners = this.getListeners(evt),
            index = this.indexOfListener(listener, listeners);

        // If the listener was found then remove it
        if(index !== -1) {
            listeners.splice(index, 1);
        }

        // If there are no more listeners in this array then remove it
        if(listeners.length === 0) {
            delete this._events[evt];
        }

        // Return the instance of EventEmitter to allow chaining
        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     *
     * @param {String} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @returns {Object} Current instance of EventEmitter for chaining.
     */
    EventEmitter.fn.removeListeners = function(evt) {
        // Remove different things depending on the state of evt
        if(evt) {
            // Remove all listeners for the specified event
            delete this._events[evt];
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

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