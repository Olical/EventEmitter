/**
 * @preserve EventEmitter v2.0.0
 * 
 * Copyright 2011, Oliver Caldwell (olivercaldwell.co.uk)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * https://github.com/Wolfy87/EventEmitter
 */

function EventEmitter() {
	// Put the instance in scope and initialise all required variables
	var instance = this,
		listeners = {},
		i = null,
		args = null;
	
	/**
	 * Assigns a listener to the specified event
	 * 
	 * @param {String} eventName Name of the event to assign the listener to
	 * @param {Function} listener Function to be executed when the specified event is emitted
	 * @returns {Object} The current instance of EventEmitter to allow chaining
	 */
	instance.addListener = function(eventName, listener) {
		// Check if we currently have a listener array for the specified event
		if(listeners[eventName]) {
			// We do, push the listener onto the end
			listeners[eventName].push(listener);
		}
		else {
			// We do not, create it with our listener inside
			listeners[eventName] = [listener];
		}
		
		// Return the instance to allow chaining
		return instance;
	};
	
	/**
	 * Assigns a listener to the specified event (alias for addListener)
	 * 
	 * @param {String} eventName Name of the event to assign the listener to
	 * @param {Function} listener Function to be executed when the specified event is emitted
	 * @returns {Object} The current instance of EventEmitter to allow chaining
	 */
	instance.on = instance.addListener;
	
	/**
	 * Emits the specified event running all listeners associated with it
	 * 
	 * @param {String} eventName Name of the event to execute the listeners of
	 * @param {Mixed} arguments You can pass as many arguments as you want after the event name. These will be passed to the listeners
	 * @returns {Object} The current instance of EventEmitter to allow chaining
	 */
	instance.emit = function(eventName) {
		// Check if we currently have a listener array for the specified event
		if(listeners[eventName]) {
			// We do, get the arguments
			args = Array.prototype.slice.call(arguments, 1);
			
			// Loop over the listeners executing them
			for(i = 0; i < listeners[eventName].length; i += 1) {
				listeners[eventName][i].apply(null, args);
			}
		}
		
		// Return the instance to allow chaining
		return instance;
	};
	
	/**
	 * Returns an array of listeners for the specified event name
	 * 
	 * @param {String} eventName Name of the event to get the listeners for
	 * @returns {Array} An array of listeners for the specified event
	 */
	instance.listeners = function(eventName) {
		// Check if we currently have a listener array for the specified event
		if(listeners[eventName]) {
			// We do, return it
			return listeners[eventName];
		}
		else {
			// We do not, create the array and return it
			return listeners[eventName] = [];
		}
	};
}