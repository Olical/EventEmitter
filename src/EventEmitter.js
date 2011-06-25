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
		args = null,
		index = null;
	
	/**
	 * Gets the index of a listener from an array
	 */
	function listenerIndex(stack, listener) {
		// Use indexOf if we can
		if(stack.indexOf) {
			return stack.indexOf(listener);
		}
		
		// Loop over the stack
		for(i = 0; i < stack.length; i += 1) {
			// Check if the listeners match
			if(stack[i] === listener) {
				// It does, return the index
				return i;
			}
		}
		
		// Default to returning -1
		return -1;
	}
	
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
	
	/**
	 * Assigns a listener to the specified event removes its self after the first run
	 * 
	 * @param {String} eventName Name of the event to assign the listener to
	 * @param {Function} listener Function to be executed when the specified event is emitted
	 * @returns {Object} The current instance of EventEmitter to allow chaining
	 */
	instance.once = function(eventName, listener) {
		// Create the wrapper function
		function wrapper() {
			// Call the listener and pass down the arguments
			listener.apply(null, arguments);
			
			// Remove the listener
			instance.removeListener(eventName, wrapper);
		}
		
		// Add the listener for the wrapper
		instance.addListener(eventName, wrapper);
		
		// Return the instance to allow chaining
		return instance;
	};
	
	/**
	 * Removes the specified listener
	 * 
	 * @param {String} eventName Name of the event to remove the listener from
	 * @param {Function} listener Listener function to be removed
	 * @returns {Object} The current instance of EventEmitter to allow chaining
	 */
	instance.removeListener = function(eventName, listener) {
		// Check if we currently have a listener array for the specified event
		if(listeners[eventName]) {
			// We do, find the index of the listener
			index = listenerIndex(listeners[eventName], listener);
			
			// Make sure we found it
			if(index !== -1) {
				// Remove it
				listeners[eventName].splice(index, 1);
			}
		}
		else {
			// We do not, create the empty listener array
			listeners[eventName] = [];
		}
		
		// Return the instance to allow chaining
		return instance;
	};
	
	/**
	 * Removes all listeners from the specified event
	 * 
	 * @param {String} eventName Name of the event to remove the listeners from
	 * @returns {Object} The current instance of EventEmitter to allow chaining
	 */
	instance.removeAllListeners = function(eventName) {
		// Replace the listener array with an empty array
		listeners[eventName] = [];
		
		// Return the instance to allow chaining
		return instance;
	};
}