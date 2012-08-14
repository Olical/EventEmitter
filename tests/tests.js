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

// Run Jasmine
jasmineEnv.execute();