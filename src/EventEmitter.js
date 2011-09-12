/**
 * @preserve EventEmitter v3.0.0
 * 
 * Copyright 2011, Oliver Caldwell (olivercaldwell.co.uk)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * https://github.com/Wolfy87/EventEmitter
 */

function EventEmitter() {
	// Initialise variables
	var listeners = {},
		instance = this;
	
	/**
	 * Event class
	 * Contains Event methods and property storage
	 */
	instance.Event = function(type, listener, once, scope) {
		// Initialise variables
		var instance = this;
		
		// Store arguments
		instance.type = type;
		instance.listener = listener;
		
		/**
		 * Executes the listener
		 */
		instance.fire = function(args) {
			this.listener.apply(scope || this, args);
		};
	};
	
	/**
	 * Adds an event listener for the specified event
	 */
	instance.addListener = function(type, listener, once, scope) {
		// Create the listener array if it does not exist yet
		if(!listeners.hasOwnProperty(type)) {
			listeners[type] = [];
		}
		
		// Push the new event to the array
		listeners[type].push(new instance.Event(type, listener, once, scope));
		
		// Emit the new listener event
		instance.emit('newListener', type, listener, once, scope);
		
		// Return the instance to allow chaining
		return instance;
	};
	
	/**
	 * Alias of the addListener method
	 */
	instance.on = instance.addListener;
}