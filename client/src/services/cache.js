const CACHE_PREFIX = 'model-portfolio-';
const DEFAULT_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export const cacheService = {
  set(key, data, expiry = DEFAULT_EXPIRY) {
    const item = {
      data,
      expiry: Date.now() + expiry,
    };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item));
  },

  get(key) {
    const item = localStorage.getItem(CACHE_PREFIX + key);
    if (!item) return null;

    const { data, expiry } = JSON.parse(item);
    if (Date.now() > expiry) {
      this.remove(key);
      return null;
    }

    return data;
  },

  remove(key) {
    localStorage.removeItem(CACHE_PREFIX + key);
  },

  clear() {
    Object.keys(localStorage)
      .filter(key => key.startsWith(CACHE_PREFIX))
      .forEach(key => localStorage.removeItem(key));
  },
};
