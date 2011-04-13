# Set the default files to be built
default: EventEmitter.min.js validate

# Compress EventEmitter.js into EventEmitter.min.js
EventEmitter.min.js: EventEmitter.js
	@@echo 'Compressing...'
	@@java -jar build/compiler.jar --js $^ --js_output_file $@
	@@echo 'Done!'

# Validate EventEmitter.js with jshint
validate:
	@@echo 'Validating...'
	@@node build/validate.js
	@@echo 'Done!'