#!/usr/bin/env make -f

.DEFAULT_GOAL := all

org_script=./lib/base62.js
min_script=./base62.min.js

.PHONY: all
all:
	@echo 'Target:'
	@echo
	@echo '  all'
	@echo '    output this message.'
	@echo
	@echo '  clean'
	@echo '    remove installed modules.'
	@echo
	@echo '  lint'
	@echo '    execute Closure Linter. (require gjslint command)'
	@echo
	@echo '  mini, minify'
	@echo '    minify script with Closure Compiler Service.'
	@echo '    (require curl command)'
	@echo
	@echo '  setup, setup-test-env'
	@echo '    install dependency modules with npm and bower.'
	@echo
	@echo '  test'
	@echo '    run test with Mocha.'
	@echo '    the browser, please open ./test/test-base62.html.'

.PHONY: clean
clean:
	$(RM) -r ./node_modules ./components

.PHONY: setup setup-test-env
setup: setup-test-env
setup-test-env:
	npm install
	bower install 'chai#~1.3' 'jquery#~1.8' 'mocha#~1.6'

.PHONY: lint
lint:
	gjslint --strict --nojsdoc base62.js

.PHONY: mini minify
mini: minify
minify:
	curl                                          \
	  -s                                          \
	  -d compilation_level=SIMPLE_OPTIMIZATIONS   \
	  -d output_format=text                       \
	  -d output_info=compiled_code                \
	  --data-urlencode "js_code@$(org_script)"    \
	  http://closure-compiler.appspot.com/compile \
	  > $(min_script)

.PHONY: test
test:
	npm test
