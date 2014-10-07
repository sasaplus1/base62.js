.DEFAULT_GOAL := all

CAT := $(if $(OS),type,cat)

UGLIFYJSC := $(shell npm bin)/uglifyjs
UGLIFYJSFLAGS := --comments -m -c 'pure_funcs=["export_", "require_"]' -r 'base62'

MINI := base62.min.js
TEST := test/base62.js

SRCS := $(addprefix lib/, \
  _intro.js \
  utility.js \
  base62.js \
  export.js \
  _outro.js \
)

.PHONY: all
all: $(MINI) $(TEST)

.PHONY: clean
clean:
	@$(RM) $(MINI) $(TEST)

$(MINI): UGLIFYJSFLAGS += -d 'process=void 0, Mocha=void 0'
$(MINI): $(SRCS)
	@$(CAT) $^ | $(UGLIFYJSC) $(UGLIFYJSFLAGS) -o $@

$(TEST): UGLIFYJSFLAGS += -d 'process=true, Mocha=true'
$(TEST): $(SRCS)
	@$(CAT) $^ | $(UGLIFYJSC) $(UGLIFYJSFLAGS) -o $@
