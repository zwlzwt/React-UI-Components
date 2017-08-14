BIN ?= node_modules/.bin

run:
	@node server.js
.PHONY: run

lint:n
	@$(BIN)/eslint --config eslint.json src webpack.config.js server.js
.PHONY: lint

build:
	@rm -fr dist
	@$(BIN)/webpack --progress --config webpack.config.pro.js
.PHONY: build

real: build
	@echo
	@echo Copy to $(HOME)/Documents/meituan/api-mock-koa2...
	@rsync -rptv \
		dist \
		$(HOME)/Documents/meituan/api-mock-koa2
		@echo
		@echo Done!
.PHONY: real

build-es:
	@rm -fr es
	@$(BIN)/babel --no-babelrc src/components --out-dir es --ignore *.test.js --plugins=transform-object-rest-spread,transform-es2015-spread --presets=es2015,react,stage-2
	@cp -Rn src/components/ es/
.PHONY: build-es

copy: build
	@echo
	@echo Copy to $(HOME)/Documents/frame/spa-frame...
	@echo
	@rsync -rptv \
		dist \
		package.json \
		src \
		.babelrc \
		eslint.json \
		Makefile \
		README.md \
		server.js \
		webpack.config.js \
		webpack.config.pro.js \
		$(HOME)/Documents/frame/spa-frame
	@echo
	@echo Done!
.PHONY: copy
