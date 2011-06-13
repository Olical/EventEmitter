**Evented JavaScript for the browser**

This script adds the EventEmitter class to your browser. It has the same API and functionality as the NodeJS implementation.

So you can listen for and emit events from what ever objects you choose.

It works exactly the same as the NodeJS version so head over to the [NodeJS docs](http://nodejs.org/docs/v0.4.5/api/events.html#events.EventEmitter) for the details.

## Documentation

### Creating an EventEmitter object

This is simple, just include the script and create a new instance of the EventEmitter class like so.

    var myEmitter = new EventEmitter();

Now the myEmitter object will have methods such as `emit` and `addListener`.

### Adding a listener

This can be done in a few ways. You can use the `addListener` method or it's alias, the `on` method.

This example uses the `addListener` method but you can swap it for `on` and it will make no difference.

    myEmitter.addListener('message', show);

This is assuming you have a function called `show` already defined. It assigns the `show` function to the `message` event.

You can also use the `once` method to add a listener that will only be fired once. The syntax is the same as the previous methods.

You can use wildcards within name spaced events like so.

    myEmitter.addListener('foo.*.bar', show);

This will then be fired every time an event that begins with `foo.` and ends with `.bar` is emitted.

You can retrieve an array of listeners for a specified event with the `listeners` method.

This will return an array of all listeners associated with the `message` event.

    myEmitter.listeners('message');

This method is chainable.

### Removing a listener

To remove a listener, use the `removeListener` method with the same arguments as you used to set it.

    myEmitter.removeListener('message', show);

You can also remove all listeners for a specified event, like so.

    myEmitter.removeAllListeners('message');

This method is chainable.

### Event limits

There is no hard limit as such, but after a certain amount a message will be posted to the console saying that you have exceeded the limit.

You can still add more, it just helps you to find bugs where it may be looping and adding too many listeners.

The default limit is 10 listeners per event.

It does not restrict functionality at all.

You can change the limit with the `setMaxListeners` method. For instance, this would set the limit to 20.

    myEmitter.setMaxListeners(20);

Setting it to 0 will disable this feature.

This method is chainable.

### Emitting events

To emit an event to all the registered listeners you have to use the `emit` method.

This would emit the `message` event and pass two arguments to the listeners.

    myEmitter.emit('message', 'arg1', 'arg2');

You can have as many arguments as you want.

## Author

[Oliver Caldwell](http://flowdev.co.uk/).

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