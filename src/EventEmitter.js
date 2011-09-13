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
	instance.Event = function(type, listener, scope, once) {
		// Initialise variables
		var instance = this;
		
		// Store arguments
		instance.type = type;
		instance.listener = listener;
		instance.active = true;
		instance.once = once;
		
		/**
		 * Executes the listener
		 */
		instance.fire = function(args) {
			// Only execute if the event is active
			if(instance.active) {
				this.listener.apply(scope || this, args);
			}
			
			// Disable the event if this is a once only event
			if(instance.once) {
				instance.active = false;
			}
		};
	};
	
	/**
	 * Adds an event listener for the specified event
	 */
	instance.addListener = function(type, listener, scope, once) {
		// Create the listener array if it does not exist yet
		if(!listeners.hasOwnProperty(type)) {
			listeners[type] = [];
		}
		
		// Push the new event to the array
		listeners[type].push(new instance.Event(type, listener, scope, once));
		
		// Emit the new listener event
		instance.emit('newListener', type, listener, scope, once);
		
		// Return the instance to allow chaining
		return instance;
	};
	
	/**
	 * Alias of the addListener method
	 */
	instance.on = instance.addListener;
	
	/**
	 * Alias of the addListener method but will remove the event after the first use
	 */
	instance.once = function(type, listener, scope) {
		instance.addListener(type, listener, scope, true);
	};
	
	/**
	 * Removes all listeners for a specified event
	 */
	instance.removeAllListeners = function(type) {
		if(listeners.hasOwnProperty(type)) {
			delete listeners[type];
		}
	};
	
	/**
	 * Retrives the array of listeners for a specified event
	 */
	instance.listeners = function(type) {
		// Return the array of listeners of false if it does not exist
		if(listeners.hasOwnProperty(type)) {
			return listeners[type];
		}
		
		return false;
	};
}