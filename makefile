# Set the source directory
src = src/

# Set up the list of source files
source = ${src}EventEmitter

# Set up default list
default: validate compress

# Validate JavaScript
validate:
	@@echo 'Validating JavaScript'
	@@for file in ${source}; do\
		node build/validate.js $${file}.js;\
	done;

# Compress JavaScript
compress:
	@@echo 'Compressing JavaScript'
	@@for file in ${source}; do\
		java -jar build/compiler.jar --js $${file}.js --js_output_file $${file}.min.js;\
	done;