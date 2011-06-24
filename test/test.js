/**
 * EventEmitter tests
 */

(function() {
	var ee = new EventEmitter();
	
	test('Adding a listener', function() {
		equals(ee, ee.addListener('test1', function() {
			return true;
		}), 'addListener should return the instance to allow chaining.');
		
		equals(ee, ee.addListener(10, function() {
			return true;
		}), 'addListener should return the instance to allow chaining.');
	});
	
	test('Emitting an event', function() {
		var checkThis = false;
		
		equals(ee, ee.addListener('test2', function() {
			checkThis = true;
		}), 'addListener should return the instance to allow chaining.');
		equals(ee, ee.emit('test2'), 'emit should return the instance to allow chaining.');
		equals(true, checkThis, 'checkThis should equal true.');
	});
	
	test('Adding a listener that will only run once', function() {
		var checkThis = 0;
		
		equals(ee, ee.once('test3', function() {
			checkThis += 1;
		}), 'once should return the instance to allow chaining.');
		equals(ee, ee.emit('test3'), 'emit should return the instance to allow chaining.');
		ee.emit('test3');
		ee.emit('test3');
		ee.emit('test3');
		equals(1, checkThis, 'checkThis should equal 1 after multiple emittions.');
	});
}());