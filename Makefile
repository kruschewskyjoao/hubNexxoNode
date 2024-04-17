export PATH := node_modules/.bin:$(PATH)
export SHELL := /bin/bash # Required for OS X for some reason

dev:
		npm install
		npm run test
		npm run dev

test:
		npm run test