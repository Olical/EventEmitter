# Set the default files to be built
default: listen.min.js validate

# Compress listen.js into listen.min.js
listen.min.js: listen.js
	@@echo 'Compressing...'
	@@java -jar build/compiler.jar --js $^ --js_output_file $@
	@@echo 'Done!'

# Validate listen.js with jshint
validate:
	@@echo 'Validating...'
	@@node build/validate.js
	@@echo 'Done!'