# projektzwo
DAS zweite Projekt

## Setup

You need the following binaries installed:
* node
* mongodb

Install the following npm tools globally
npm install -g gulp tsd


## Install Dependencies
```$
npm install
```

note: bower install is automatically run by the npm postinstall script.

## Development

```$
gulp
```

browser starts at http://127.0.0.1:3000

## API

```$
node backend/src/main
```

To view the API:
http://127.0.0.1:4000/api/

note: gulp serve task has a proxy that forward calls from http://127.0.0.1:3000/api -> http://127.0.0.1:4000/api
(we simulate what usually some forefront server like nginx is doing, and keep static file serving away from our express app)