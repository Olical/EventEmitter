/**
 * @preserve EventEmitter v1.0.0
 * 
 * Copyright 2011, Oliver Caldwell
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * https://github.com/Wolfy87/Listen
 */

// Initialise the class
function EventEmitter() {
	// Initialise the storage variables
	var events = {};
	var list = [];
	
	// Put this in scope
	var that = this;
	
	// Allow a way of accessing the storage variables
	this.getEvents = function() {
		return that.events;
	}
	
	this.getListeners = function() {
		return that.list;
	}
}

/**
 * Adds a listener for a specified event
 * 
 * @param {String} name Name of the event
 * @param {Function} listener Run when the event is emitted
 * @param {Boolan} once If true, the listener will only be run once, use EventEmitter.once instead, this is mainly for internal use
 */
EventEmitter.prototype.addListener = function(name, listener, once) {
	// Grab the index of the listener
	var index = this.getListeners().length;
	
	// Add the listener
	this.getListeners().push(listener);
	
	// Add the event to the events object if required
	if(typeof this.getEvents()[name] === 'undefined') {
		this.getEvents()[name] = [];
	}
	
	// Add the listeners index to the event
	this.getEvents()[name].push(index);
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
 * @param {Function} listener Run when the event is emitted
 */
EventEmitter.prototype.removeListener = function(name, listener) {
	
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
