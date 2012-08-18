default:
	@@echo "Available commands: server, docs"

.PHONY: docs

# A basic HTTP server for testing
server:
	python -m SimpleHTTPServer

# Builds the API documentation
docs:
	node_modules/.bin/dox < EventEmitter.js > docs/data.json
	node_modules/.bin/dustc --name=api docs/api.dust docs/api.dust.js
	node docs/render.js