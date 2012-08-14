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

// Run Jasmine
jasmineEnv.execute();