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

## Tests

EventEmitter is tested and working in the following browsers.

 * Chrome
 * Firefox
 * Safari
 * Opera
 * IE 5 - 9

If you test it in something a little more obscure, please let me know how it turned out.

To test, simply run `test.html` in the test folder.

## Author

EventEmitter was written by [Oliver Caldwell](http://olivercaldwell.co.uk/).

## Licences

### MIT
Copyright (C) 2011 Oliver Caldwell

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

### GPL
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