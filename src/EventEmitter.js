/**
 * @preserve EventEmitter v2.0.0
 * 
 * Copyright 2011, Oliver Caldwell (olivercaldwell.co.uk)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * https://github.com/Wolfy87/EventEmitter
 */

function EventEmitter() {
	// Put the instance in scope and initialise required variables
	var instance = this,
		events = {};
	
	/**
	 * Assigns a listener to the specified event
	 * 
	 * @param {String} eventName Name of the event to assign the listener to
	 * @param {Function} listener Function to be executed when the specified event is emitted
	 * @returns {Object} The current instance of EventEmitter to allow chaining
	 */
	instance.addListener = function(eventName, listener) {
		// Check if we currently have a listener array for the specified event
		if(typeof events[eventName] === 'undefined') {
			// We do not, create it with our listener inside
			events[eventName] = [listener];
		}
		else {
			// We do, push the listener onto the end
			events[eventName].push(listener);
		}
		
		// Return the instance to allow chaining
		return instance;
	};
}