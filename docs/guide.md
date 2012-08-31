# Guide

This guide should get you going with EventEmitter. Once finished you may wish to learn more about the script and use methods that are not shown here. At that point you should either browse [the API documentation](https://github.com/Wolfy87/EventEmitter/blob/master/docs/api.md) or have a look around [the source](https://github.com/Wolfy87/EventEmitter/blob/master/EventEmitter.js).

## Getting a copy of the script

### Cloning the full source as a submodule

    git submodule add git://github.com/Wolfy87/EventEmitter.git assets/js/EventEmitter

This will copy the whole repository, including all documentation and build scripts. Obviously you must replace the destination directory with your desired location.

### Downloading a minified version

You can get pre-built versions of EventEmitter from [the downloads page](https://github.com/Wolfy87/EventEmitter/downloads). I would recommend using the latest version. It's the latest for a reason.

## Loading the script

### Browser via script tag

This is so obvious it hurts. Just remember to set the right path to load from.

    <script type='text/javascript' src='/assets/js/EventEmitter/EventEmitter.js'></script>

Or maybe you want to load a minified version you downloaded...

    <script type='text/javascript' src='/assets/js/EventEmitter-VERSION.min.js'></script>

You can then access it in your code like so.

    var ee = new EventEmitter();

### Browser via AMD

I love AMD, so I implemented it in EventEmitter. If the script is loaded into a page containing an AMD loaded then it will not be placed in the global namespace as it usually is. Instead it must be accessed via AMD like this.

    require(['EventEmitter'], function(EventEmitter) {
        var ee = new EventEmitter();
    });

### node.js

This is pretty simple, just require the file and load the `EventEmitter` attribute out of it.

    var EventEmitter = require('./assets/js/EventEmitter').EventEmitter;
    var ee = new EventEmitter();

## Extending with the EventEmitter class

You probably won't want to use EventEmitter as a raw class. You will probably want to write a `Player` class or something like that and implement EventEmitter's methods into it. To do this you will need to clone and merge EventEmitter's prototype object into your classes prototype object. Here is how I would do that with MooTools, I am sure there are alternatives for almost all other frameworks.

    function Player(){}
    Player.prototype = Object.clone(EventEmitter.prototype);

If you do not want to use a huge framework like that then you might want to use this script I wrote, [Heir](https://github.com/Wolfy87/Heir). It just makes prototypical inheritance nice and easy. So here is how you would inherit EventEmitter's methods with Heir.

    function Player(){}
    Player.inherit(EventEmitter);

That's all there is to it.