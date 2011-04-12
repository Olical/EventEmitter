/**
 * @preserve EventEmitter v1.0.0
 * 
 * Copyright 2011, Oliver Caldwell (flowdev.co.uk)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * https://github.com/Wolfy87/Listen
 */

// Initialise the class
function EventEmitter() {}

// Initialise the storage variables
EventEmitter.prototype._events = {};
EventEmitter.prototype._listeners = [];

/**
 * Adds a listener for a specified event
 * 
 * @param {String} name Name of the event
 * @param {Function} listener Run when the event is emitted
 * @param {Boolan} once If true, the listener will only be run once, use EventEmitter.once instead, this is mainly for internal use
 */
EventEmitter.prototype.addListener = function(name, listener, once) {
	// Grab the index of the listener
	var index = this._listeners.length;
	
	// Add the listener
	this._listeners.push({
		listener: listener,
		once: (once) ? true : false
	});
	
	// Add the event to the events object if required
	if(typeof this._events[name] === 'undefined') {
		this._events[name] = [];
	}
	
	// Add the listeners index to the event
	this._events[name].push(index);
};

/**
 * Adds a listener for a specified event (alias of EventEmitter.addListener)
 * 
 * @param {String} name Name of the event
 * @param {Function} listener Run when the event is emitted
 * @param {Boolan} once If true, the listener will only be run once, use EventEmitter.once instead, this is mainly for internal use
 */
EventEmitter.prototype.on = EventEmitter.prototype.addListener;

/**
 * Adds a listener for a specified event that will only be called once
 * 
 * @param {String} name Name of the event
 * @param {Function} listener Run when the event is emitted
 */
EventEmitter.prototype.once = function(name, listener) {
	this.addListener(name, listener, true);
};

/**
 * Removes a listener for a specified event
 * 
 * @param {String} name Name of the event
 * @param {Function} listener Reference to the listener function
 */
EventEmitter.prototype.removeListener = function(name, listener) {
	// Initialise any required variables
	var i = null,
		indexes = null;
	
	// Make sure the event exists
	if(this._events[name] instanceof Array) {
		// Grab the listeners indexes
		indexes = this._events[name]; 
		
		// Loop through all of the indexes
		for(i = 0; i < indexes.length; i++) {
			// Check if we have found the listener
			if(this._listeners[indexes[i]].listener === listener) {
				// It is, remove it and return
				this._events[name].splice(i, 1);
			}
		}
	}
};

/**
 * Removes all the listeners for a specified event
 * 
 * @param {String} name Name of the event
 */
EventEmitter.prototype.removeAllListeners = function(name) {
	
};


/** 
 * Sets the max number of listeners before a message is displayed
 * If it is set to 0 then there is no limit
 * 
 * @param {Number} n Max number of listeners before a message is displayed
 */
EventEmitter.prototype.setMaxListeners = function(n) {
	
};

/** 
 * Returns an array of listeners for the specified event
 * 
 * @param {String} name Name of the event
 * @returns {Array} An array of the assigned listeners
 */
EventEmitter.prototype.listeners = function(name) {
	
};

/** 
 * Emits the specified event with optional arguments
 * 
 * @param {String} name Name of the event to be emitted
 * @param {Mixed} An argument to be passed to the listeners, you can have as many of these as you want
 */
EventEmitter.prototype.emit = function(name) {
	
};
