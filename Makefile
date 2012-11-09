#!/usr/bin/env make -f

.DEFAULT_GOAL := all

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
	@echo '  setup, setup-test-env'
	@echo '    install dependency modules with npm and bower.'
	@echo
	@echo '  test'
	@echo '    run test for node.js with mocha.'
	@echo '    for browser, please open ./test/test-base62.html.'

.PHONY: clean
clean:
	$(RM) -r ./node_modules ./components

.PHONY: setup setup-test-env
setup: setup-test-env
setup-test-env:
	npm install
	bower install 'chai#~1.3' 'jquery#~1.8' 'mocha#~1.6'

.PHONY: test
test:
	npm test
