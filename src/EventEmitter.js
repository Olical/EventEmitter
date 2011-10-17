/**
 * @preserve EventEmitter v3.0.0
 * 
 * Copyright 2011, Oliver Caldwell (olivercaldwell.co.uk)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * https://github.com/Wolfy87/EventEmitter
 */

(function(exports) {
	'use strict';
	
	function EventEmitter() {
		// Initialise the listeners object
		this._listeners = {};
	}
	
	/**
	 * Event class
	 * Contains Event methods and property storage
	 * 
	 * @param {String} type Event type name
	 * @param {Function} listener Function to be called when the event is fired
	 * @param {Object} scope Object that this should be set to when the listener is called
	 * @param {Boolean} once If true then the listener will be removed after the first call
	 * @param {Object} instance The parent EventEmitter instance
	 */
	EventEmitter.prototype.Event = function(type, listener, scope, once, instance) {
		// Store arguments
		this.type = type;
		this.listener = listener;
		this.scope = scope;
		this.once = once;
		this.instance = instance;
	};
	
	/**
	 * Executes the listener
	 * 
	 * @param {Array} args List of arguments to pass to the listener
	 * @return {Boolean} If false then it was a once event
	 */
	EventEmitter.prototype.Event.prototype.fire = function(args) {
		this.listener.apply(this.scope || this, args || []);
		
		// Remove the listener if this is a once only listener
		if(this.once) {
			this.instance.removeListener(this.type, this.listener);
			return false;
		}
	};
	
	/**
	 * Passes every listener for a specified event to a function one at a time
	 * 
	 * @param {String} type Event type name
	 * @param {Function} callback Function to pass each listener to
	 * @return {Object} The current EventEmitter instance to allow chaining
	 */
	EventEmitter.prototype.eachListener = function(type, callback) {
		// Initialise variables
		var i = null,
			possibleListeners = null,
			result = null;
		
		// Only loop if the type exists
		if(this._listeners.hasOwnProperty(type)) {
			possibleListeners = this._listeners[type];
			
			for(i = 0; i < possibleListeners.length; i += 1) {
				result = callback.call(this, possibleListeners[i], i);
				
				if(result === false) {
					i -= 1;
				}
				else if(result === true) {
					break;
				}
			}
		}
		
		// Return the instance to allow chaining
		return this;
	};
	
	/**
	 * Adds an event listener for the specified event
	 * 
	 * @param {String} type Event type name
	 * @param {Function} listener Function to be called when the event is fired
	 * @param {Object} scope Object that this should be set to when the listener is called
	 * @param {Boolean} once If true then the listener will be removed after the first call
	 * @return {Object} The current EventEmitter instance to allow chaining
	 */
	EventEmitter.prototype.addListener = function(type, listener, scope, once) {
		// Create the listener array if it does not exist yet
		if(!this._listeners.hasOwnProperty(type)) {
			this._listeners[type] = [];
		}
		
		// Push the new event to the array
		this._listeners[type].push(new this.Event(type, listener, scope, once, this));
		
		// Emit the new listener event
		this.emit('newListener', type, listener, scope, once);
		
		// Return the instance to allow chaining
		return this;
	};
	
	/**
	 * Alias of the addListener method
	 * 
	 * @param {String} type Event type name
	 * @param {Function} listener Function to be called when the event is fired
	 * @param {Object} scope Object that this should be set to when the listener is called
	 * @param {Boolean} once If true then the listener will be removed after the first call
	 */
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	/**
	 * Alias of the addListener method but will remove the event after the first use
	 * 
	 * @param {String} type Event type name
	 * @param {Function} listener Function to be called when the event is fired
	 * @param {Object} scope Object that this should be set to when the listener is called
	 * @return {Object} The current EventEmitter instance to allow chaining
	 */
	EventEmitter.prototype.once = function(type, listener, scope) {
		return this.addListener(type, listener, scope, true);
	};
	
	/**
	 * Removes the a listener for the specified event
	 * 
	 * @param {String} type Event type name the listener must have for the event to be removed
	 * @param {Function} listener Listener the event must have to be removed
	 * @return {Object} The current EventEmitter instance to allow chaining
	 */
	EventEmitter.prototype.removeListener = function(type, listener) {
		this.eachListener(type, function(currentListener, index) {
			// If this is the listener remove it from the array
			if(currentListener.listener === listener) {
				this._listeners[type].splice(index, 1);
			}
		});
		
		// Remove the property if there are no more listeners
		if(this._listeners[type] && this._listeners[type].length === 0) {
			delete this._listeners[type];
		}
		
		// Return the instance to allow chaining
		return this;
	};
	
	/**
	 * Removes all listeners for a specified event
	 * 
	 * @param {String} type Event type name to remove all listeners from
	 * @return {Object} The current EventEmitter instance to allow chaining
	 */
	EventEmitter.prototype.removeAllListeners = function(type) {
		if(this._listeners.hasOwnProperty(type)) {
			delete this._listeners[type];
		}
		
		// Return the instance to allow chaining
		return this;
	};
	
	/**
	 * Retrieves the array of listeners for a specified event
	 * 
	 * @param {String} type Event type name to return all listeners from
	 * @return {Array | Boolean} Will return either an array of listeners or false if there are none
	 */
	EventEmitter.prototype.listeners = function(type) {
		// Return the array of listeners of false if it does not exist
		if(this._listeners.hasOwnProperty(type)) {
			return this._listeners[type];
		}
		
		return false;
	};
	
	/**
	 * Emits an event executing all appropriate listeners
	 * 
	 * @param {String} type Event type name to run all listeners from
	 * @param {Array} args List of arguments to pass to the listener
	 * @return {Object} The current EventEmitter instance to allow chaining
	 */
	EventEmitter.prototype.emit = function(type, args) {
		this.eachListener(type, function(currentListener) {
			return currentListener.fire(args);
		});
		
		// Return the instance to allow chaining
		return this;
	};
	
	// Export the class
	exports.EventEmitter = EventEmitter;
}( (typeof window === 'object') ? window : exports ));