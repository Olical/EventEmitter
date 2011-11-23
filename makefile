default: validate compress
develop: validate

validate:
	@@echo 'Validating'
	@@node build/validate.js src/EventEmitter.js

compress:
	@@echo 'Compressing'
	@@uglifyjs -o src/EventEmitter.min.js src/EventEmitter.js
