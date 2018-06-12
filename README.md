# TempMap

TempMap is in-memory data structure with ttl.
It has zero-dependencies.


# Install
   `npm i`

# Usage example

```javascript
    const { TmpMap } = require('tmp_map')
    const cache = new TmpMap()
    const expireMs = 1000
    cache.set('key', 'value', expireMs)
    console.log(cache.get('key')) // value
```

# Notes
This data structure on top of Node.js timers. Timers are crucial to Node.js.
Internally, any TCP I/O connection creates a timer so that we can time out of connections.
Similar to other hashed wheel timers, Node.js uses a [hash table and a linked list](https://github.com/nodejs/node/blob/master/lib/timers.js)
to maintain the timers instances.
