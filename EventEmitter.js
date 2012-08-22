/**
 * EventEmitter v4.0.0 - github.com/Wolfy87/EventEmitter
 * Oliver Caldwell
 * MIT license
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
        var i = listeners.length;
        while(i--) {
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

            // If there are no more listeners in this array then remove it
            if(listeners.length === 0) {
                this._events[evt] = null;
            }
        }

        // Return the instance of EventEmitter to allow chaining
        return this;
    };

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added.
     *
     * @param {String|Object} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @returns {Object} Current instance of EventEmitter for chaining.
     */
    EventEmitter.fn.addListeners = function(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     *
     * @param {String|Object} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @returns {Object} Current instance of EventEmitter for chaining.
     */
    EventEmitter.fn.removeListeners = function(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @returns {Object} Current instance of EventEmitter for chaining.
     */
    EventEmitter.fn.manipulateListeners = function(remove, evt, listeners) {
        // Initialise any required variables
        var i,
            value,
            single = remove ? this.removeListener : this.addListener,
            multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of it's properties to this method
        if(typeof evt === 'object') {
            for(i in evt) {
                if(evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if(typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while(i--) {
                single.call(this, evt, listeners[i]);
            }
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
    EventEmitter.fn.removeEvent = function(evt) {
        // Remove different things depending on the state of evt
        if(evt) {
            // Remove all listeners for the specified event
            this._events[evt] = null;
        }
        else {
            // Remove all listeners in all events
            this._events = null;
        }

        // Return the instance of EventEmitter to allow chaining
        return this;
    };

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     *
     * @param {String} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each argument.
     * @returns {Object} Current instance of EventEmitter for chaining.
     */
    EventEmitter.fn.emitEvent = function(evt, args) {
        // Get the listeners for the event
        // Also initialise any other required variables
        var listeners = this.getListeners(evt),
            i = listeners.length;

        // Make args default to an empty array
        args = args || [];

        while(i--) {
            // Execute every listener attached to the event
            // Apply the arguments array to each listener too
            listeners[i].apply(null, args);
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