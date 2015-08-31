# http-middleware
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![Downloads][downloads-image]][downloads-url]
[![js-standard-style][standard-image]][standard-url]

Middleware layer for `http`.

## Installation
```sh
$ npm install http-middleware
```

## Usage
```js
const mw = require('http-middleware')
const http = require('http')

http.createServer((req, res) => {
  const fns = [
    (req, res) => res.write('oh yeah!'),
    (req, res, next) => { 
      res.statusCode = 200
      next()
    }
  ]
  mw(req, res, fns, res.end)
}).listen(1337)
```

## API
### mw(req, res, middleware [,done])
Create a middleware layer that runs an array of middleware functions in
sequence. Middleware functions have a signature of `req, res, next` where
`next` is optional.

## FAQ
### What is middleware?
Middleware is typically an array of functions that is run before executing
'business logic'. Function types include authentication, rate limiting, logging
and more.

### Why not use a framework for middleware?
Frameworks are a bundle of opinions. By splitting features off into separate
modules (like this middleware module) users can compose their perfect
framework. See [http-framework](https://github.com/Raynos/http-framework) for
more modules in this spirit.

## See Also
- [http-framework](https://github.com/Raynos/http-framework)

## License
[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/http-middleware.svg?style=flat-square
[npm-url]: https://npmjs.org/package/http-middleware
[travis-image]: https://img.shields.io/travis/yoshuawuyts/http-middleware/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/http-middleware
[codecov-image]: https://img.shields.io/codecov/c/github/yoshuawuyts/http-middleware/master.svg?style=flat-square
[codecov-url]: https://codecov.io/github/yoshuawuyts/http-middleware
[downloads-image]: http://img.shields.io/npm/dm/http-middleware.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/http-middleware
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
