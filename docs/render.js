// Load the require modules
var dust = require('../node_modules/dustjs-linkedin'),
    fs = require('fs');

// Load the rendered template
fs.readFile('docs/api.dust.js', function(err, data) {
    // Throw any errors
    if(err) {
        throw err;
    }

    // Load the rendered template into dust
    dust.loadSource(data);

    // Load the data
    fs.readFile('docs/data.json', function(err, raw) {
        // Throw any errors
        if(err) {
            throw err;
        }

        // Build the data object
        var data = {
            properties: [],
            functions: []
        };

        for(i = 0; i < raw.length; i += 1) {
            
        }

        // Pipe the data into the template
        dust.render('api', data, function(err, out) {
            // Throw any errors
            if(err) {
                throw err;
            }

            // Write the data to the output
            fs.writeFile('docs/api.md', out);
        });
    });
});