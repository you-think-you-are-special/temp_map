# TempMap

[![npm version](https://badge.fury.io/js/temp_map.svg)](https://badge.fury.io/js/temp_map)
[![Build Status](https://travis-ci.com/you-think-you-are-special/temp_map.svg?branch=master&clean)](https://travis-ci.com/you-think-you-are-special/temp_map)
[![codecov](https://codecov.io/gh/you-think-you-are-special/temp_map/branch/master/graph/badge.svg)](https://codecov.io/gh/you-think-you-are-special/temp_map)
[![dependencies Status](https://david-dm.org/you-think-you-are-special/temp_map/status.svg?style=flat-square)](https://david-dm.org/you-think-you-are-special/temp_map)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](.github/CONTRIBUTING.md)

TempMap is in-memory data structure with ttl.
It has zero-dependencies.


# Install
   `npm i temp_map`

# Usage example

```javascript
    const { TempMap } = require('temp_map')
    const cache = new TempMap()
    const expireMs = 1000

    cache.set('key', 'value', expireMs)
    console.log(cache.get('key')) // value
    
    setTimeout(() => cache.get('key'), 2000) // undefined
```

# Notes
This data structure on top of Node.js timers. Timers are crucial to Node.js.  
Internally, any TCP I/O connection creates a timer so that we can time out of connections.  
Similar to other hashed wheel timers, Node.js uses a [hash table and a linked list](https://github.com/nodejs/node/blob/master/lib/timers.js)
to maintain the timers instances.
