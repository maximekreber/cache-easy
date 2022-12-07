  # Simple Cache

  [![NPM Version][npm-version-image]][npm-url]
  [![NPM Install Size][npm-install-size-image]][npm-install-size-url]
  ![Coverage][coverage-image]
  [![Github Issues][github-issues-image]][github-issues]
  ![Dependecies][dependencies-image]


  
  [![NPM Downloads][npm-downloads-image]][npm-downloads-url]

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ npm install cache-easy
```

## Examples

```js
import CacheEasy from 'cache-easy';

const defaultTtl = 10000; // 10 sec
const cache = new CacheEasy(ttl);

cache.set('key', 'Hello World'); // ttl is 10 sec

cache.set('otherKey', 'Hello World', 1000); // ttl is 1 sec

cache.has('key'); // => true

cache.get('key'); // => Hello World

cache.delete('key');

cache.has('key'); // => false

const value = async () => {
    // do async job
    return 'Hello from Promise';
};

// it's don't call value if key is already set and ttl is valid
const key = await cache.getOrSet('key', value); // value can take promise, function or classic value

console.log(key); // => 'Hello from Promise'
```

[npm-downloads-image]: https://badgen.net/npm/dm/cache-easy
[npm-downloads-url]: https://npmcharts.com/compare/cache-easy?minimal=true
[npm-install-size-image]: https://badgen.net/packagephobia/install/cache-easy
[npm-install-size-url]: https://packagephobia.com/result?p=cache-easy
[npm-url]: https://npmjs.org/package/cache-easy
[npm-version-image]: https://badgen.net/npm/v/cache-easy
[coverage-image]: https://img.shields.io/badge/coverage-100%25-brightgreen
[dependencies-image]: https://img.shields.io/badge/dependencies-0-brightgreen
[github-issues]: https://github.com/maximekreber/cache-easy/issues
[github-issues-image]: https://img.shields.io/github/issues/maximekreber/cache-easy