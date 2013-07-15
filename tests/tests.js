(function() {
	// Setup Mocha and Chai.
	mocha.setup('tdd');
	assert = chai.assert;

	// Configure the tests
	suite('getListeners', function() {
		var ee;

		setup(function() {
			ee = new EventEmitter();
		});

		test('initialises the event object and a listener array', function() {
			ee.getListeners('foo');
			assert.deepEqual(ee._events, {
				foo: []
			});
		});

		test('does not overwrite listener arrays', function() {
			var listeners = ee.getListeners('foo');
			listeners.push('bar');

			assert.deepEqual(ee._events, {
				foo: ['bar']
			});

			ee.getListeners('foo');

			assert.deepEqual(ee._events, {
				foo: ['bar']
			});
		});

		test('allows you to fetch listeners by regex', function ()
		{
			var count = 0;

			ee.addListener('foo', function() { count++; });
			ee.addListener('bar', function() { count++; return 'bar'; });
			ee.addListener('baz', function() { count++; return 'baz'; });

			var listeners = ee.getListeners(/ba[rz]/);

			assert.strictEqual(listeners.bar.length + listeners.baz.length, 2);
			assert.strictEqual(listeners.bar[0].listener(), 'bar');
			assert.strictEqual(listeners.baz[0].listener(), 'baz');
		});
	});

	suite('flattenListeners', function () {
		var ee;
		var fn1 = function(){};
		var fn2 = function(){};
		var fn3 = function(){};

		setup(function () {
			ee = new EventEmitter();
		});

		test('takes an array of objects and returns an array of functions', function () {
			var input = [
				{listener: fn1},
				{listener: fn2},
				{listener: fn3}
			];
			var output = ee.flattenListeners(input);
			assert.deepEqual(output, [fn1, fn2, fn3]);
		});

		test('if given an empty array, an empty array is returned', function () {
			var output = ee.flattenListeners([]);
			assert.deepEqual(output, []);
		});
	});

	suite('addListener', function() {
		var ee;
		var fn1 = function(){};
		var fn2 = function(){};

		setup(function() {
			ee = new EventEmitter();
		});

		test('adds a listener to the specified event', function() {
			ee.addListener('foo', fn1);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), [fn1]);
		});

		test('does not allow duplicate listeners', function() {
			ee.addListener('bar', fn1);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('bar')), [fn1]);

			ee.addListener('bar', fn2);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('bar')), [fn1, fn2]);

			ee.addListener('bar', fn1);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('bar')), [fn1, fn2]);
		});

		test('allows you to add listeners by regex', function ()
		{
			ee.removeEvent();
			var count = 0;

			ee.defineEvents(['bar', 'baz']);
			ee.addListener('foo', function() { count++; });
			ee.addListener(/ba[rz]/, function() { count++; });
			ee.emitEvent(/ba[rz]/);

			assert.strictEqual(count, 2);
		});
	});

	suite('addOnceListener', function () {
		var ee;
		var counter;
		var fn1 = function() { counter++; };

		setup(function () {
			ee = new EventEmitter();
			counter = 0;
		});

		test('once listeners can be added', function () {
			ee.addOnceListener('foo', fn1);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), [fn1]);
		});

		test('listeners are only executed once', function () {
			ee.addOnceListener('foo', fn1);
			ee.emitEvent('foo');
			ee.emitEvent('foo');
			ee.emitEvent('foo');
			assert.strictEqual(counter, 1);
		});

		test('listeners can be removed', function () {
			ee.addOnceListener('foo', fn1);
			ee.removeListener('foo', fn1);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), []);
		});
	});

	suite('removeListener', function() {
		var ee;
		var fn1 = function(){};
		var fn2 = function(){};
		var fn3 = function(){};
		var fn4 = function(){};
		var fn5 = function(){};
		var fnX = function(){};

		setup(function() {
			ee = new EventEmitter();
		});

		test('does nothing when the listener is not found', function() {
			var orig = ee.getListeners('foo').length;
			ee.removeListener('foo', fn1);
			assert.lengthOf(ee.getListeners('foo'), orig);
		});

		test('can handle removing events that have not been added', function() {
			assert.notProperty(ee, '_events');
			ee.removeEvent('foo');
			assert.property(ee, '_events');
			assert.isObject(ee._events);
		});

		test('actually removes events', function() {
			ee.removeEvent('foo');
			assert.notDeepProperty(ee, '_events.foo');
		});

		test('removes listeners', function() {
			var listeners = ee.getListeners('bar');

			ee.addListener('bar', fn1);
			ee.addListener('bar', fn2);
			ee.addListener('bar', fn3);
			ee.addListener('bar', fn3); // Make sure doubling up does nothing
			ee.addListener('bar', fn4);
			assert.deepEqual(ee.flattenListeners(listeners), [fn1, fn2, fn3, fn4]);

			ee.removeListener('bar', fn3);
			assert.deepEqual(ee.flattenListeners(listeners), [fn1, fn2, fn4]);

			ee.removeListener('bar', fnX);
			assert.deepEqual(ee.flattenListeners(listeners), [fn1, fn2, fn4]);

			ee.removeListener('bar', fn1);
			assert.deepEqual(ee.flattenListeners(listeners), [fn2, fn4]);

			ee.removeListener('bar', fn4);
			assert.deepEqual(ee.flattenListeners(listeners), [fn2]);

			ee.removeListener('bar', fn2);
			assert.deepEqual(ee.flattenListeners(ee._events.bar), []);
		});

		test('removes with a regex', function() {
			ee.addListeners({
				foo: [fn1, fn2, fn3, fn4, fn5],
				bar: [fn1, fn2, fn3, fn4, fn5],
				baz: [fn1, fn2, fn3, fn4, fn5]
			});

			ee.removeListener(/ba[rz]/, fn3);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), [fn5, fn4, fn3, fn2, fn1]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('bar')), [fn5, fn4, fn2, fn1]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('baz')), [fn5, fn4, fn2, fn1]);
		});
	});

	suite('getListenersAsObject', function () {
		var ee;

		setup(function() {
			ee = new EventEmitter();
			ee.addListener('bar', function(){});
			ee.addListener('baz', function(){});
		});

		test('returns an object for strings', function () {
			var listeners = ee.getListenersAsObject('bar');
			assert.isObject(listeners);
			assert.lengthOf(listeners.bar, 1);
		});

		test('returns an object for regexs', function () {
			var listeners = ee.getListenersAsObject(/ba[rz]/);
			assert.isObject(listeners);
			assert.lengthOf(listeners.bar, 1);
			assert.lengthOf(listeners.baz, 1);
		});
	});

	suite('defineEvent', function () {
		var ee;

		setup(function() {
			ee = new EventEmitter();
		});

		test('defines an event when there is nothing else inside', function () {
			ee.defineEvent('foo');
			assert.isArray(ee._events.foo);
		});

		test('defines an event when there are other events already', function () {
			var f = function(){};
			ee.addListener('foo', f);
			ee.defineEvent('bar');

			assert.deepEqual(ee.flattenListeners(ee._events.foo), [f]);
			assert.isArray(ee._events.bar);
		});

		test('does not overwrite existing events', function () {
			var f = function(){};
			ee.addListener('foo', f);
			ee.defineEvent('foo');
			assert.deepEqual(ee.flattenListeners(ee._events.foo), [f]);
		});
	});

	suite('defineEvents', function () {
		var ee;

		setup(function() {
			ee = new EventEmitter();
		});

		test('defines multiple events', function () {
			ee.defineEvents(['foo', 'bar']);
			assert.isArray(ee._events.foo, []);
			assert.isArray(ee._events.bar, []);
		});
	});

	suite('removeEvent', function() {
		var ee;
		var fn1 = function(){};
		var fn2 = function(){};
		var fn3 = function(){};
		var fn4 = function(){};
		var fn5 = function(){};

		setup(function() {
			ee = new EventEmitter();

			ee.addListener('foo', fn1);
			ee.addListener('foo', fn2);
			ee.addListener('bar', fn3);
			ee.addListener('bar', fn4);
			ee.addListener('baz', fn5);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), [fn1, fn2]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('bar')), [fn3, fn4]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('baz')), [fn5]);
		});

		test('removes all listeners for the specified event', function() {
			ee.removeEvent('bar');
			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), [fn1, fn2]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('bar')), []);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('baz')), [fn5]);

			ee.removeEvent('baz');
			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), [fn1, fn2]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('bar')), []);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('baz')), []);
		});

		test('removes all events when no event is specified', function() {
			ee.removeEvent();
			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), []);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('bar')), []);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('baz')), []);
		});

		test('removes listeners when passed a regex', function ()
		{
			var count = 0;
			ee.removeEvent();

			ee.addListener('foo', function() { count++; return 'foo'; });
			ee.addListener('bar', function() { count++; return 'bar'; });
			ee.addListener('baz', function() { count++; return 'baz'; });

			ee.removeEvent(/ba[rz]/);
			var listeners = ee.getListeners('foo');

			assert.lengthOf(listeners, 1);
			assert.strictEqual(listeners[0].listener(), 'foo');
		});
	});

	suite('emitEvent', function() {
		var ee;

		setup(function() {
			ee = new EventEmitter();
		});

		test('executes attached listeners', function() {
			var run = false;

			ee.addListener('foo', function() {
				run = true;
			});
			ee.emitEvent('foo');

			assert.isTrue(run);
		});

		test('executes attached with a single argument', function() {
			var key = null;

			ee.addListener('bar', function(a) {
				key = a;
			});
			ee.emitEvent('bar', [50]);

			assert.strictEqual(key, 50);

			ee.emit('bar', 60);
			assert.strictEqual(key, 60);
		});

		test('executes attached with arguments', function() {
			var key = null;

			ee.addListener('bar2', function(a, b) {
				key = a + b;
			});
			ee.emitEvent('bar2', [40, 2]);

			assert.strictEqual(key, 42);
		});

		test('executes multiple listeners', function() {
			var count = 0;

			ee.addListener('baz', function() { count++; });
			ee.addListener('baz', function() { count++; });
			ee.addListener('baz', function() { count++; });
			ee.addListener('baz', function() { count++; });
			ee.addListener('baz', function() { count++; });

			ee.emitEvent('baz');

			assert.strictEqual(count, 5);
		});

		test('executes multiple listeners after one has been removed', function() {
			var count = 0;
			var toRemove = function() { count++; };

			ee.addListener('baz', function() { count++; });
			ee.addListener('baz', function() { count++; });
			ee.addListener('baz', toRemove);
			ee.addListener('baz', function() { count++; });
			ee.addListener('baz', function() { count++; });

			ee.removeListener('baz', toRemove);

			ee.emitEvent('baz');

			assert.strictEqual(count, 4);
		});

		test('executes multiple listeners and removes those that return true', function() {
			var count = 0;

			ee.addListener('baz', function() { count++; });
			ee.addListener('baz', function() { count++; return true; });
			ee.addListener('baz', function() { count++; return false; });
			ee.addListener('baz', function() { count++; return 1; });
			ee.addListener('baz', function() { count++; return true; });

			ee.emitEvent('baz');
			ee.emitEvent('baz');

			assert.strictEqual(count, 8);
		});

		test('executes all listeners that match a regular expression', function ()
		{
			var count = 0;

			ee.addListener('foo', function() { count++; });
			ee.addListener('bar', function() { count++; });
			ee.addListener('baz', function() { count++; });

			ee.emitEvent(/ba[rz]/);
			assert.strictEqual(count, 2);
		});

		test('global object is defined', function()
		{
			ee.addListener('foo', function() {
				assert.equal(this, ee);
			});

			ee.emitEvent('foo');
		});
	});

	suite('manipulateListeners', function() {
		var ee;
		var fn1 = function(){};
		var fn2 = function(){};
		var fn3 = function(){};
		var fn4 = function(){};
		var fn5 = function(){};

		setup(function() {
			ee = new EventEmitter();
		});

		test('manipulates multiple with an array', function() {
			ee.manipulateListeners(false, 'foo', [fn1, fn2, fn3, fn4, fn5]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), [fn5, fn4, fn3, fn2, fn1]);

			ee.manipulateListeners(true, 'foo', [fn1, fn2]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), [fn5, fn4, fn3]);

			ee.manipulateListeners(true, 'foo', [fn3, fn5]);
			ee.manipulateListeners(false, 'foo', [fn4, fn1]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), [fn4, fn1]);

			ee.manipulateListeners(true, 'foo', [fn4, fn1]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), []);
		});

		test('manipulates with an object', function() {
			ee.manipulateListeners(false, {
				foo: [fn1, fn2, fn3],
				bar: fn4
			});

			ee.manipulateListeners(false, {
				bar: [fn5, fn1]
			});

			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), [fn3, fn2, fn1]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('bar')), [fn4, fn1, fn5]);

			ee.manipulateListeners(true, {
				foo: fn1,
				bar: [fn5, fn4]
			});

			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), [fn3, fn2]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('bar')), [fn1]);

			ee.manipulateListeners(true, {
				foo: [fn3, fn2],
				bar: fn1
			});

			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), []);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('bar')), []);
		});

		test('does not execute listeners just after they are added in another listeners', function() {
			var count = 0;

			ee.addListener('baz', function() { count++; });
			ee.addListener('baz', function() { count++; });
			ee.addListener('baz', function() {
				count++;

				ee.addListener('baz', function() {
					count++;
				});
			});
			ee.addListener('baz', function() { count++; });
			ee.addListener('baz', function() { count++; });

			ee.emitEvent('baz');

			assert.strictEqual(count, 5);
		});
	});

	suite('addListeners', function() {
		var ee;
		var fn1 = function(){};
		var fn2 = function(){};
		var fn3 = function(){};
		var fn4 = function(){};
		var fn5 = function(){};

		setup(function() {
			ee = new EventEmitter();
		});

		test('adds with an array', function() {
			ee.addListeners('foo', [fn1, fn2, fn3]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), [fn3, fn2, fn1]);

			ee.addListeners('foo', [fn4, fn5]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), [fn3, fn2, fn1, fn5, fn4]);
		});

		test('adds with an object', function() {
			ee.addListeners({
				foo: fn1,
				bar: [fn2, fn3]
			});
			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), [fn1]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('bar')), [fn3, fn2]);

			ee.addListeners({
				foo: [fn4],
				bar: fn5
			});
			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), [fn1, fn4]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('bar')), [fn3, fn2, fn5]);
		});

		test('allows you to add listeners by regex', function ()
		{
			ee.removeEvent();
			var count = 0;

			ee.defineEvents(['bar', 'baz']);
			ee.addListeners('foo', [function() { count++; }]);
			ee.addListeners(/ba[rz]/, [function() { count++; }, function() { count++; }]);
			ee.emitEvent(/ba[rz]/);

			assert.strictEqual(count, 4);
		});
	});

	suite('removeListeners', function() {
		var ee;
		var fn1 = function(){};
		var fn2 = function(){};
		var fn3 = function(){};
		var fn4 = function(){};
		var fn5 = function(){};

		setup(function() {
			ee = new EventEmitter();
		});

		test('removes with an array', function() {
			ee.addListeners('foo', [fn1, fn2, fn3, fn4, fn5]);
			ee.removeListeners('foo', [fn2, fn3]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), [fn5, fn4, fn1]);

			ee.removeListeners('foo', [fn5, fn4]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), [fn1]);

			ee.removeListeners('foo', [fn1]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), []);
		});

		test('removes with an object', function() {
			ee.addListeners({
				foo: [fn1, fn2, fn3, fn4, fn5],
				bar: [fn1, fn2, fn3, fn4, fn5]
			});

			ee.removeListeners({
				foo: fn2,
				bar: [fn3, fn4, fn5]
			});
			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), [fn5, fn4, fn3, fn1]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('bar')), [fn2, fn1]);

			ee.removeListeners({
				foo: [fn3],
				bar: [fn2, fn1]
			});
			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), [fn5, fn4, fn1]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('bar')), []);
		});

		test('removes with a regex', function() {
			ee.addListeners({
				foo: [fn1, fn2, fn3, fn4, fn5],
				bar: [fn1, fn2, fn3, fn4, fn5],
				baz: [fn1, fn2, fn3, fn4, fn5]
			});

			ee.removeListeners(/ba[rz]/, [fn3, fn4]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('foo')), [fn5, fn4, fn3, fn2, fn1]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('bar')), [fn5, fn2, fn1]);
			assert.deepEqual(ee.flattenListeners(ee.getListeners('baz')), [fn5, fn2, fn1]);
		});
	});

	suite('setOnceReturnValuea', function() {
		var ee;

		setup(function () {
			ee = new EventEmitter();
		});

		test('will remove if left as default and returning true', function () {
			var count = 0;

			ee.addListener('baz', function() { count++; });
			ee.addListener('baz', function() { count++; return true; });
			ee.addListener('baz', function() { count++; return false; });
			ee.addListener('baz', function() { count++; return 1; });
			ee.addListener('baz', function() { count++; return true; });

			ee.emitEvent('baz');
			ee.emitEvent('baz');

			assert.strictEqual(count, 8);
		});

		test('will remove those that return a string when set to that string', function () {
			var count = 0;

			ee.setOnceReturnValue('only-once');
			ee.addListener('baz', function() { count++; });
			ee.addListener('baz', function() { count++; return true; });
			ee.addListener('baz', function() { count++; return 'only-once'; });
			ee.addListener('baz', function() { count++; return 1; });
			ee.addListener('baz', function() { count++; return 'only-once'; });
			ee.addListener('baz', function() { count++; return true; });

			ee.emitEvent('baz');
			ee.emitEvent('baz');

			assert.strictEqual(count, 10);
		});

		test('will not remove those that return a different string to the one that is set', function () {
			var count = 0;

			ee.setOnceReturnValue('only-once');
			ee.addListener('baz', function() { count++; });
			ee.addListener('baz', function() { count++; return true; });
			ee.addListener('baz', function() { count++; return 'not-only-once'; });
			ee.addListener('baz', function() { count++; return 1; });
			ee.addListener('baz', function() { count++; return 'only-once'; });
			ee.addListener('baz', function() { count++; return true; });

			ee.emitEvent('baz');
			ee.emitEvent('baz');

			assert.strictEqual(count, 11);
		});
	});

	// Execute the tests.
	mocha.run();
}());