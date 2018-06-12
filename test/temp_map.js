const sinon = require('sinon');
const { assert } = require('chai');

describe('temp_map.js', () => {
  before(function () {
    this.TempMap = require('../src/temp_map').TempMap;
  });

  beforeEach(function () {
    this.clock = sinon.useFakeTimers();
  });

  afterEach(function () {
    this.clock.restore();
  });

  describe('#get/set/has', () => {
    it('should store value', function () {
      const tempMap = new this.TempMap();
      const expireMs = 1000;
      tempMap.set('key', 'value', expireMs);
      assert.ok(tempMap.has('key'), 'Key exist');
      assert.deepEqual(tempMap.get('key'), 'value', 'Value is stored and correct');
    });

    it('should expire value', function () {
      const tempMap = new this.TempMap();
      const expireMs = 1000;
      tempMap.set('key', 'value', expireMs);
      this.clock.tick(expireMs);

      assert.notOk(tempMap.has('key'), 'Key not exist');
      assert.deepEqual(tempMap.get('key'), undefined, 'Value is expired');
    });

    it('should update ttl if value exists', function () {
      const tempMap = new this.TempMap();
      const expireMs = 1000;
      tempMap.set('key', 'value', expireMs);
      this.clock.tick(expireMs - 100);
      tempMap.set('key', 'value', expireMs);
      this.clock.tick(200);

      assert.ok(tempMap.has('key'), 'Key exist');
      assert.deepEqual(tempMap.get('key'), 'value', 'Value is stored and correct');
    });
  });
});