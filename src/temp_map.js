class TempMap {
  constructor() {
    this.__storage = new Map();
  }

  /**
   * @returns {boolean}
   */
  has() {
    return this.__storage.has(...arguments);
  }

  /**
   * @returns {V | undefined}
   */
  get() {
    return this.__storage.get(...arguments);
  }

  /**
   * @param key hashable
   */
  remove(key) {
    const timeoutKey = `${key}_timeout`;
    const storage = this.__storage;

    storage.delete(key);
    clearTimeout(storage.get(timeoutKey));
    storage.delete(timeoutKey);
  }

  /**
   * @param key hashable
   * @param value
   * @param {number} expireMs
   * @return {TempMap}
   */
  set(key, value, expireMs = 1000) {
    const timeoutKey = `${key}_timeout`;
    const storage = this.__storage;

    if (storage.has(key)) {
      this.remove(key);
    }

    storage.set(timeoutKey, setTimeout(() => this.remove(key), expireMs));
    storage.set(key, value);
    return this;
  }
}

/**
 * @type {TempMap}
 */
module.exports.TempMap = TempMap;
