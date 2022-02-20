.PHONY: up
up:
	docker-compose up -d

.PHONY: build_c
build_c:
	docker-compose build --no-cache

.PHONY: build
build:
	docker-compose build

.PHONY: stop
stop:
	docker-compose stop

.PHONY: down
down:
	docker-compose down

.PHONY: websocket
websocket:
	docker-compose exec websocket bash

.PHONY: npm-start
npm-start:
	docker-compose exec websocket bash -c "npm start"

.PHONY: npm-start-ts
npm-start-ts:
	docker-compose exec websocket bash -c "npm run start-ts-dev"

.PHONY: npm-install
npm-install:
	docker-compose exec websocket bash -c "npm install"

.PHONY: nginx
nginx:
	docker-compose exec nginx bash

.PHONY: nginx-restart
nginx-restart:
	docker-compose exec nginx bash -c "nginx -s reload"