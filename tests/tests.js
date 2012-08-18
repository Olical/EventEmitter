// Set up the Jasmine environment
var jasmineEnv = jasmine.getEnv();
jasmineEnv.updateInterval = 1000;

var htmlReporter = new jasmine.HtmlReporter();

jasmineEnv.addReporter(htmlReporter);

jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
};

// Configure the tests
describe('EventEmitter.fn.getListeners', function() {
    var ee;

    beforeEach(function() {
        ee = new EventEmitter();
    });

    it('initialises the event object and a listener array', function() {
        ee.getListeners('foo');
        expect(ee._events).toEqual({
            foo: []
        });
    });

    it('does not overwrite listener arrays', function() {
        var listeners = ee.getListeners('foo');
        listeners.push('bar');

        expect(ee._events).toEqual({
            foo: ['bar']
        });

        ee.getListeners('foo');

        expect(ee._events).toEqual({
            foo: ['bar']
        });
    });
});

describe('EventEmitter.fn.indexOfListener', function() {
    var ee,
        fn = function(){};

    beforeEach(function() {
        ee = new EventEmitter();
    });

    it('returns -1 on non existent listeners', function() {
        expect(ee.indexOfListener(fn, ee.getListeners('foo'))).toEqual(-1);

        // Testing again to make sure it does not work on init of storage only
        expect(ee.indexOfListener(fn, ee.getListeners('foo'))).toEqual(-1);
    });

    it('returns the index of an existing listener', function() {
        var listeners = ee.getListeners('foo');
        listeners.push('a');
        listeners.push('b');
        listeners.push(fn);
        listeners.push('c');

        expect(ee.indexOfListener(fn, listeners)).toEqual(2);
    });
});

describe('EventEmitter.fn.addListener', function() {
    var ee,
        fn1 = function(){},
        fn2 = function(){};

    beforeEach(function() {
        ee = new EventEmitter();
    });

    it('adds a listener to the specified event', function() {
        ee.addListener('foo', fn1);
        expect(ee.getListeners('foo')).toEqual([fn1]);
    });

    it('does not allow duplicate listeners', function() {
        ee.addListener('bar', fn1);
        expect(ee.getListeners('bar')).toEqual([fn1]);

        ee.addListener('bar', fn2);
        expect(ee.getListeners('bar')).toEqual([fn1, fn2]);

        ee.addListener('bar', fn1);
        expect(ee.getListeners('bar')).toEqual([fn1, fn2]);
    });
});

describe('EventEmitter.fn.removeListener', function() {
    var ee,
        fn1 = function(){},
        fn2 = function(){},
        fn3 = function(){},
        fn4 = function(){},
        fnX = function(){};

    beforeEach(function() {
        ee = new EventEmitter();
    });

    it('does nothing when the listener is not found', function() {
        var orig = ee.getListeners('foo').length;
        ee.removeListener('foo', fn1);
        expect(ee.getListeners('foo').length).toEqual(orig);
    });

    it('removes listeners', function() {
        var listeners = ee.getListeners('bar');

        ee.addListener('bar', fn1);
        ee.addListener('bar', fn2);
        ee.addListener('bar', fn3);
        ee.addListener('bar', fn3); // Make sure doubling up does nothing
        ee.addListener('bar', fn4);
        expect(listeners).toEqual([fn1, fn2, fn3, fn4]);

        ee.removeListener('bar', fn3);
        expect(listeners).toEqual([fn1, fn2, fn4]);

        ee.removeListener('bar', fnX);
        expect(listeners).toEqual([fn1, fn2, fn4]);

        ee.removeListener('bar', fn1);
        expect(listeners).toEqual([fn2, fn4]);

        ee.removeListener('bar', fn4);
        expect(listeners).toEqual([fn2]);

        ee.removeListener('bar', fn2);
        expect(ee._events.bar).not.toBeDefined();
    });
});

describe('EventEmitter.fn.removeEvent', function() {
    var ee,
        fn1 = function(){},
        fn2 = function(){},
        fn3 = function(){},
        fn4 = function(){},
        fn5 = function(){};

    beforeEach(function() {
        ee = new EventEmitter();

        ee.addListener('foo', fn1);
        ee.addListener('foo', fn2);
        ee.addListener('bar', fn3);
        ee.addListener('bar', fn4);
        ee.addListener('baz', fn5);
        expect(ee.getListeners('foo')).toEqual([fn1, fn2]);
        expect(ee.getListeners('bar')).toEqual([fn3, fn4]);
        expect(ee.getListeners('baz')).toEqual([fn5]);
    });

    it('removes all listeners for the specified event', function() {
        ee.removeEvent('bar');
        expect(ee.getListeners('foo')).toEqual([fn1, fn2]);
        expect(ee.getListeners('bar')).toEqual([]);
        expect(ee.getListeners('baz')).toEqual([fn5]);

        ee.removeEvent('baz');
        expect(ee.getListeners('foo')).toEqual([fn1, fn2]);
        expect(ee.getListeners('bar')).toEqual([]);
        expect(ee.getListeners('baz')).toEqual([]);
    });

    it('removes all events when no event is specified', function() {
        ee.removeEvent();
        expect(ee.getListeners('foo')).toEqual([]);
        expect(ee.getListeners('bar')).toEqual([]);
        expect(ee.getListeners('baz')).toEqual([]);
    });
});

describe('EventEmitter.fn.emitEvent', function() {
    var ee;

    beforeEach(function() {
        ee = new EventEmitter();
    });

    it('executes attached listeners', function() {
        var run = false;

        ee.addListener('foo', function() {
            run = true;
        });
        ee.emitEvent('foo');

        expect(run).toEqual(true);
    });

    it('executes attached with arguments', function() {
        var key = null;

        ee.addListener('bar', function(passedKey) {
            key = passedKey;
        });
        ee.emitEvent('bar', [42]);

        expect(key).toEqual(42);
    });

    it('executes multiple listeners', function() {
        var count = 0;

        ee.addListener('baz', function() { count++; });
        ee.addListener('baz', function() { count++; });
        ee.addListener('baz', function() { count++; });
        ee.addListener('baz', function() { count++; });
        ee.addListener('baz', function() { count++; });

        ee.emitEvent('baz');

        expect(count).toEqual(5);
    });
});

describe('EventEmitter.fn.manipulateListeners', function() {
    var ee;
    function fn1(){}
    function fn2(){}
    function fn3(){}
    function fn4(){}
    function fn5(){}

    beforeEach(function() {
        ee = new EventEmitter();
    });

    it('manipulates multiple with an array', function() {
        ee.manipulateListeners(false, 'foo', [fn1, fn2, fn3, fn4, fn5]);
        expect(ee.getListeners('foo')).toEqual([fn5, fn4, fn3, fn2, fn1]);

        ee.manipulateListeners(true, 'foo', [fn1, fn2]);
        expect(ee.getListeners('foo')).toEqual([fn5, fn4, fn3]);

        ee.manipulateListeners(true, 'foo', [fn3, fn5]);
        ee.manipulateListeners(false, 'foo', [fn4, fn1]);
        expect(ee.getListeners('foo')).toEqual([fn4, fn1]);

        ee.manipulateListeners(true, 'foo', [fn4, fn1]);
        expect(ee.getListeners('foo')).toEqual([]);
    });
});

// Run Jasmine
jasmineEnv.execute();