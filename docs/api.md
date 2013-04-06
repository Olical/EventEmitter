# API

Each of the methods listed in the API are accessed through an instance of EventEmitter. You can create an instance with `var ee = new EventEmitter();`. Then you can call API methods from `ee`, for example `ee.emitEvent('foo');`.

You may also be interested in [the guide](https://github.com/Wolfy87/EventEmitter/blob/master/docs/guide.md) which highlights some key features of EventEmitter and how to use them. It is a broad overview of the script whereas this is concise information about each method in the API.

## EventEmitter

<ul>
<li>Class for managing events.
<ul><li>Can be extended to provide event functionality in other classes.
*</li>
<li>@class Manages event registering and emitting.</li></ul></li>
</ul>


## indexOfListener

<ul>
<li>Finds the index of the listener for the event in it's storage array
 *
<ul><li>@param {Function} listener Method to look for.</li>
<li>@param {Function[]} listeners Array of listeners to search through.</li>
<li>@return {Number} Index of the specified listener, -1 if not found</li>
<li>@private</li></ul></li>
</ul>


## _getEvents

<ul>
<li>Fetches the events object and creates one if required.
 *
<ul><li>@return {Object} The events storage object.</li>
<li>@private</li></ul></li>
</ul>


## getListeners

<ul>
<li>Returns the listener array for the specified event.
<ul><li>Will initialise the event object and listener arrays if required.
*</li>
<li>Will return an object if you use a regex search. The object contains</li>
<li>keys for each matched event. So /ba[rz]/ might return an object</li>
<li>containing bar and baz. But only if you have either defined them with</li>
<li>defineEvent or added some listeners to them.
*</li>
<li>Each property in the object response is an array of listener functions.
*</li>
<li>@param {String|RegExp} evt Name of the event to return the listeners from.</li>
<li>@return {Function[]|Object} All listener functions for the event.</li></ul></li>
</ul>


## getListenersAsObject

<ul>
<li>Fetches the requested listeners via getListeners but will always return
<ul><li>the results inside an object. This is mainly for internal use but</li>
<li>others may find it useful.
*</li>
<li>@param {String|RegExp} evt Name of the event to return the listeners from.</li>
<li>@return {Object} All listener functions for an event in an object.</li></ul></li>
</ul>


## addListener

<ul>
<li>Adds a listener function to the specified event.
<ul><li>The listener will not be added if it is a duplicate.</li>
<li>If the listener returns true then it will be removed after it is called.
*</li>
<li>If you pass a regular expression as the event name then the listener</li>
<li>will be added to all events that match it.
*</li>
<li>@param {String|RegExp} evt Name of the event to attach the listener to.</li>
<li>@param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.</li>
<li>@return {Object} Current instance of EventEmitter for chaining.</li></ul></li>
</ul>


## on

<ul>
<li>Alias of addListener</li>
</ul>


## defineEvent

<ul>
<li>Defines an event name. This is required if you want to use a regex
<ul><li>to add a listener to multiple events at once. If you don't do this then</li>
<li>how do you expect it to know what event to add to? Should it just add</li>
<li>to every possible match for a regex? No. That is scary and bad.
*</li>
<li>You need to tell it what event names should be matched by a regex.
*</li>
<li>@param {String} evt Name of the event to create.</li>
<li>@return {Object} Current instance of EventEmitter for chaining.</li></ul></li>
</ul>


## defineEvents

<ul>
<li>Uses defineEvent to define multiple events.
 *
<ul><li>@param {String[]} evts An array of event names to define.</li>
<li>@return {Object} Current instance of EventEmitter for chaining.</li></ul></li>
</ul>


## removeListener

<ul>
<li>Removes a listener function from the specified event.
 *
<ul><li>When passed a regular expression as the event name, it will remove the</li>
<li>listener from all events that match it.
*</li>
<li>@param {String|RegExp} evt Name of the event to remove the listener from.</li>
<li>@param {Function} listener Method to remove from the event.</li>
<li>@return {Object} Current instance of EventEmitter for chaining.</li></ul></li>
</ul>


## off

<ul>
<li>Alias of removeListener</li>
</ul>


## addListeners

<ul>
<li>Adds listeners in bulk using the manipulateListeners method.
 *
<ul><li>If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
*</li>
<li>You can also pass it a regular expression to add the array of listeners to all events that match it.
*</li>
<li>Yeah, this function does quite a bit. That's probably a bad thing.
*</li>
<li>@param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.</li>
<li>@param {Function[]} [listeners] An optional array of listener functions to add.</li>
<li>@return {Object} Current instance of EventEmitter for chaining.</li>
<li>@doc</li></ul></li>
</ul>


## removeListeners

<ul>
<li>Removes listeners in bulk using the manipulateListeners method.
<ul><li>If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.</li>
<li>You can also pass it an event name and an array of listeners to be removed.
*</li>
<li>You can also pass it a regular expression to remove the listeners from all events that match it.
*</li>
<li>@param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.</li>
<li>@param {Function[]} [listeners] An optional array of listener functions to remove.</li>
<li>@return {Object} Current instance of EventEmitter for chaining.</li></ul></li>
</ul>


## manipulateListeners

<ul>
<li>Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
<ul><li>The first argument will determine if the listeners are removed (true) or added (false).</li>
<li>If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.</li>
<li>You can also pass it an event name and an array of listeners to be added/removed.
*</li>
<li>You can also pass it a regular expression to manipulate the listeners of all events that match it.
*</li>
<li>@param {Boolean} remove True if you want to remove listeners, false if you want to add.</li>
<li>@param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.</li>
<li>@param {Function[]} [listeners] An optional array of listener functions to add/remove.</li>
<li>@return {Object} Current instance of EventEmitter for chaining.</li></ul></li>
</ul>


## removeEvent

<ul>
<li>Removes all listeners from a specified event.
<ul><li>If you do not specify an event then all listeners will be removed.</li>
<li>That means every event will be emptied.
*</li>
<li>You can also pass a regex to remove all events that match it.
*</li>
<li>@param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.</li>
<li>@return {Object} Current instance of EventEmitter for chaining.</li></ul></li>
</ul>


## emitEvent

<ul>
<li>Emits an event of your choice.
<ul><li>When emitted, every listener attached to that event will be executed.</li>
<li>If you pass the optional argument array then those arguments will be passed to every listener upon execution.</li>
<li>Because it uses <code>apply</code>, your array of arguments will be passed as if you wrote them out separately.</li>
<li>So they will not arrive within the array on the other side, they will be separate.
*</li>
<li>You can also pass a regular expression to emit to all events that match it.
*</li>
<li>@param {String|RegExp} evt Name of the event to emit and execute listeners for.</li>
<li>@param {Array} [args] Optional array of arguments to be passed to each listener.</li>
<li>@return {Object} Current instance of EventEmitter for chaining.</li></ul></li>
</ul>


## trigger

<ul>
<li>Alias of emitEvent</li>
</ul>


## emit

<ul>
<li>Subtly different from emitEvent in that it will pass its arguments on to the listeners, as
<ul><li>opposed to taking a single array of arguments to pass on.
<em></li>
<li>As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
*</li>
<li>@param {String|RegExp} evt Name of the event to emit and execute listeners for.</li>
<li>@param {...</em>} Optional additional arguments to be passed to each listener.</li>
<li>@return {Object} Current instance of EventEmitter for chaining.</li></ul></li>
</ul>

