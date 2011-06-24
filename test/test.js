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
		var checkThis = false,
			argsTest = null;
		
		equals(ee, ee.addListener('test2', function() {
			checkThis = true;
		}), 'addListener should return the instance to allow chaining.');
		equals(ee, ee.emit('test2'), 'emit should return the instance to allow chaining.');
		equals(true, checkThis, 'checkThis should equal true.');
		
		equals(ee, ee.addListener('test2.1', function(number) {
			argsTest = number;
		}), 'addListener should return the instance to allow chaining.');
		equals(ee, ee.emit('test2.1', 10), 'emit should return the instance to allow chaining.');
		equals(10, argsTest, 'argsTest should equal the specified number.');
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
	
	test('Removing a listener', function() {
		var checkThis = false;
		
		function testFunction() {
			checkThis = true;
		}
		
		equals(ee, ee.addListener('test4', testFunction), 'addListener should return the instance to allow chaining.');
		equals(ee, ee.addListener('test4.1', testFunction), 'addListener should return the instance to allow chaining.');
		equals(ee, ee.removeListener('test4', testFunction), 'removeListener should return the instance to allow chaining.');
		equals(ee, ee.emit('test4'), 'emit should return the instance to allow chaining.');
		equals(false, checkThis, 'checkThis should equal false because the listener has been removed.');
		
		equals(ee, ee.emit('test4.1'), 'emit should return the instance to allow chaining.');
		equals(true, checkThis, 'checkThis should equal true because the other listener should still exist.');
	});
	
	test('Removing all listeners', function() {
		var checkThis = false;
		
		function testFunction() {
			checkThis = true;
		}
		
		function testFunction2() {
			checkThis = true;
		}
		
		equals(ee, ee.addListener('test5', testFunction), 'addListener should return the instance to allow chaining.');
		equals(ee, ee.addListener('test5', testFunction2), 'addListener should return the instance to allow chaining.');
		
		equals(ee, ee.removeAllListeners('test5'), 'removeAllListeners should return the instance to allow chaining.');
		
		equals(ee, ee.emit('test5'), 'emit should return the instance to allow chaining.');
		equals(false, checkThis, 'checkThis should equal false because the listener has been removed.');
	});
	
	test('List all listeners', function() {
		function testFunction() {
			return true;
		}
		
		function testFunction2() {
			return true;
		}
		
		equals(ee, ee.addListener('test6', testFunction), 'addListener should return the instance to allow chaining.');
		equals(ee, ee.addListener('test6', testFunction2), 'addListener should return the instance to allow chaining.');
		
		equals([testFunction, testFunction2], ee.listeners('test6'), 'lisrsners should return an array containing both functions.');
		
		equals(ee, ee.removeAllListeners('test6'), 'removeAllListeners should return the instance to allow chaining.');
		
		equals([], ee.listeners('test6'), 'lisrsners should return an empty array.');
	});
}());