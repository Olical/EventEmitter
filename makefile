default:
	@@echo "Available commands: server"

.PHONY: docs

# A basic HTTP server for testing
server:
	python -m SimpleHTTPServer

# Builds the API documentation
docs:
	dox < EventEmitter.js