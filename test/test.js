/**
 * EventEmitter tests
 */

(function() {
	var ee = new EventEmitter();
	
	module('addListener');
	
	test('Adding a listener with a string for a name', function() {
		equals(ee, ee.addListener('test1', function() {
			return true;
		}), 'addListener should return the instance to allow chaining.');
	});
	
	test('Adding a listener with a number for a name', function() {
		equals(ee, ee.addListener(1337, function() {
			return true;
		}), 'addListener should return the instance to allow chaining.');
	});
}());