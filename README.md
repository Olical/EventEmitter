# EventEmitter

**Evented JavaScript for the browser**

This script adds the EventEmitter class to your browser.

So you can listen for and emit events from what ever objects you choose.

EventEmitter deters from the NodeJS implementation slightly but it is lighter and faster.

## Example

	// Initialise the EventEmitter
	var ee = new EventEmitter();
	
	// Initialise the listener function
	function myListener() {
		console.log('The foo event was emitted.');
	}
	
	// Add the listener
	ee.addListener('foo', myListener);
	
	// Emit the foo event
	ee.emit('foo'); // The listener function is now called
	
	// Remove the listener
	ee.removeListener('foo', myListener);
	
	// Log the array of listeners to show that it has been removed
	console.log(ee.listeners('foo'));

## API

This is just the method list for the API. For in-depth argument documentation please check the source. Every method has a JSDoc comment block that explains every aspect of the method.

 * EventEmitter.eachListener(type, callback) - Loops over every listener for an event passing them to the callback.
 * EventEmitter.addListener(type, listener, scope, once) - Adds an event listener for the specified event.
 * EventEmitter.on(type, listener, scope, once) - Alias of the addListener method.
 * EventEmitter.once(type, listener, scope) - Alias of the addListener method but will remove the event after the first use.
 * EventEmitter.removeListener(type, listener) - Removes the a listener for the specified event.
 * EventEmitter.removeAllListeners(type) - Removes all listeners for a specified event. If no event type is passed it will remove every listener.
 * EventEmitter.listeners(type) - Retrieves the array of listeners for a specified event.
 * EventEmitter.emit(type) - Emits an event executing all appropriate listeners. It passes any extra arguments to the listeners.
 * EventEmitter.setMaxListeners(maxListeners) - Sets the max listener count for the EventEmitter.

## Tests

EventEmitter is tested and working in the following browsers.

 * Chrome
 * Firefox
 * Safari
 * Opera
 * IE 5+

If you test it in something a little more obscure, please let me know how it turned out.

To test, simply run `test.html` in the test folder.

## Author

EventEmitter was written by [Oliver Caldwell](http://olivercaldwell.co.uk/).

## Licence (GPL v3)

Copyright (C) 2011 Oliver Caldwell

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.