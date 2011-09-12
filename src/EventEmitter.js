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
	instance.Event = function(type, listener, scope) {
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
}