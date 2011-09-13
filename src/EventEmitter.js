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
		var eventInstance = this;
		
		// Store arguments
		eventInstance.type = type;
		eventInstance.listener = listener;
		eventInstance.once = once;
		
		/**
		 * Executes the listener
		 */
		eventInstance.fire = function(args) {
			this.listener.apply(scope || this, args);
			
			// Remove the listener if this is a once only listener
			if(eventInstance.once) {
				instance.removeListener(type, listener);
			}
		};
	};
	
	/**
	 * Passes every listener for a specified event to a function one at a time
	 */
	instance.eachListener = function(type, callback) {
		// Initialise variables
		var i = null,
			possibleListeners = null;
		
		// Only loop if the type exists
		if(listeners.hasOwnProperty(type)) {
			possibleListeners = listeners[type];
			
			for(i = 0; i < possibleListeners.length; i += 1) {
				callback.call(instance, possibleListeners[i], i);
			}
		}
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
		return instance.addListener(type, listener, scope, true);
	};
	
	/**
	 * Removes the a listener for the specified event
	 */
	instance.removeListener = function(type, listener) {
		instance.eachListener(type, function(currentListener, index) {
			// If this is the listener, disable it and break out
			if(currentListener.listener === currentListener) {
				console.log(inde);
				listeners[type].splice(index, 1);
			}
		});
		
		// Remove the property if there are no more listeners
		if(listeners[type] && listeners[type].length === 0) {
			delete listeners[type];
		}
		
		// Return the instance to allow chaining
		return instance;
	};
	
	/**
	 * Removes all listeners for a specified event
	 */
	instance.removeAllListeners = function(type) {
		if(listeners.hasOwnProperty(type)) {
			delete listeners[type];
		}
		
		// Return the instance to allow chaining
		return instance;
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
	
	/**
	 * Emits an event executing all appropriate listeners
	 */
	instance.emit = function(type, args) {
		instance.eachListener(type, function(currentListener) {
			currentListener.fire(args);
		});
		
		// Return the instance to allow chaining
		return instance;
	};
}

// Check for exports
// If found, the class needs to be added to it
// This allows server side JavaScript to use this script
if(typeof exports !== 'undefined') {
	exports.EventEmitter = EventEmitter;
}