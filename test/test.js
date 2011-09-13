/**
 * EventEmitter tests
 */

(function() {
	test('Adding and retrieving listeners', function() {
		var ee = new EventEmitter();
		
		equal(ee.listeners('testEvent'), false, 'Checking for any listeners');
		
		ee.addListener('testEvent', function() {
			// Listener
		});
		equal(ee.listeners('testEvent')[0].type, 'testEvent', 'Retrieving the first listener');
		
		ee.addListener('testEvent', function() {
			// Another listener for the same event
		});
		equal(ee.listeners('testEvent')[1].type, 'testEvent', 'Retrieving the second listener');
		
		ee.addListener('anotherTestEvent', function() {
			// Listener for new event
		});
		equal(ee.listeners('anotherTestEvent')[0].type, 'anotherTestEvent', 'Retrieving the first listener for a different event');
		
		ee.addListener('anotherTestEvent', function() {
			// Another listener for new event
		});
		equal(ee.listeners('anotherTestEvent')[1].type, 'anotherTestEvent', 'Retrieving the second listener for a different event');
		
		ee.addListener('onTest', function() {
			// Listener via the alias
		});
		equal(ee.listeners('onTest')[0].type, 'onTest', 'Retrieving the first listener for a different event added via the on alias');
	});
	
	test('Removing listeners', function() {
		var ee = new EventEmitter();
		
		function testListener() {
			// Listener
		}
		
		function testListener2() {
			// Listener 2
		}
		
		ee.addListener('testEvent', testListener);
		equal(ee.listeners('testEvent')[0].type, 'testEvent', 'Retrieving the first listener');
		
		ee.addListener('testEvent', testListener2);
		equal(ee.listeners('testEvent')[1].type, 'testEvent', 'Retrieving the second listener');
		
		ee.removeListener('testEvent', testListener);
		equal(ee.listeners('testEvent')[1], undefined, 'Retrieving the second listener (should be gone)');
		equal(ee.listeners('testEvent')[0].listener, testListener2, 'First should now be the second');
		
		ee.removeListener('testEvent', testListener2);
		equal(ee.listeners('testEvent'), false, 'Retrieving any listeners (should be gone)');
	});
}());