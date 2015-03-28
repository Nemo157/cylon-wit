cylon-wit
=========

[![travis-ci](https://img.shields.io/travis/Nemo157/cylon-wit?style=flat-square)](https://travis-ci.org/Nemo157/cylon-wit)
[![npm-version](https://img.shields.io/npm/v/cylon-wit?style=flat-square)](https://www.npmjs.com/package/cylon-wit)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

How to Install
--------------

```sh
npm install --save cylon-wit
```

How to Use
----------

```js
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    wit: { adaptor: 'wit', access_token: process.env.WIT_ACCESS_TOKEN },
    keyboard: { adaptor: 'keyboard' },
  },

  devices: {
    wit: { driver: 'wit', connection: 'wit' },
    keyboard: { driver: 'keyboard', connection: 'keyboard' },
  },

  work: function (my) {
    my.keyboard.on('a', () => {
      if (my.wit.listening) {
        console.log('Parsing')
        my.wit.finish()
      } else {
        console.log('Listening')
        my.wit.listen()
      }
    });

    my.wit.on('outcome', function (outcome, res) {
      console.log('Parsed input as', '"' + res._text + '"');
      console.log('Intent:', '"' + outcome.intent + '"');
      console.log('Entities:', JSON.stringify(outcome.entities));
    });

    my.wit.on('unparsed', function (result) {
      console.log('Could not parse speech:', JSON.stringify(result))
    });

    my.wit.on('error', function (err, res) {
      console.log('Error:', err, res)
    });
  },
}).start();
```

License
-------
MIT
