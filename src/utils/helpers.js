/**
 * General-purpose helper utilities.
 */

/**
 * Capitalise the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
export const capitalize = (str = '') =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

/**
 * Truncate a string to `maxLength` characters, appending "…".
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
export const truncate = (str = '', maxLength = 80) =>
  str.length > maxLength ? `${str.slice(0, maxLength)}…` : str;

/**
 * Generate a URL-safe slug from a string.
 * @param {string} str
 * @returns {string}
 */
export const slugify = (str = '') =>
  str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

/**
 * Deep clone a plain object / array using JSON serialisation.
 * @param {*} value
 * @returns {*}
 */
export const deepClone = (value) => JSON.parse(JSON.stringify(value));

/**
 * Pick specific keys from an object.
 * @param {object} obj
 * @param {string[]} keys
 * @returns {object}
 */
export const pick = (obj, keys) =>
  keys.reduce((acc, key) => { if (key in obj) acc[key] = obj[key]; return acc; }, {});

/**
 * Omit specific keys from an object.
 * @param {object} obj
 * @param {string[]} keys
 * @returns {object}
 */
export const omit = (obj, keys) =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));

/**
 * Group an array of objects by a key.
 * @param {object[]} arr
 * @param {string} key
 * @returns {Object.<string, object[]>}
 */
export const groupBy = (arr, key) =>
  arr.reduce((acc, item) => {
    const group = item[key];
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});

/**
 * Flatten a nested array one level deep.
 * @param {Array} arr
 * @returns {Array}
 */
export const flattenOnce = (arr) => [].concat(...arr);

/**
 * Sort an array of objects by a key (ascending by default).
 * @param {object[]} arr
 * @param {string} key
 * @param {'asc'|'desc'} order
 * @returns {object[]}
 */
export const sortBy = (arr, key, order = 'asc') =>
  [...arr].sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return order === 'asc' ?  1 : -1;
    return 0;
  });

/**
 * Convert a file size in bytes to a human-readable string.
 * @param {number} bytes
 * @returns {string}
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Build a query string from a plain object.
 * Omits undefined / null values.
 * @param {object} params
 * @returns {string}  e.g. "?page=1&limit=10"
 */
export const buildQueryString = (params = {}) => {
  const qs = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  return qs ? `?${qs}` : '';
};

/**
 * Generate a random hex colour (useful for avatar placeholders).
 * @returns {string}
 */
export const randomColor = () =>
  `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`;

/**
 * Get the initials of a full name (max 2 characters).
 * @param {string} name
 * @returns {string}
 */
export const getInitials = (name = '') =>
  name.trim().split(' ').slice(0, 2).map((n) => n[0]?.toUpperCase()).join('');

/**
 * Safely parse JSON; returns a fallback value on error.
 * @param {string} json
 * @param {*} fallback
 * @returns {*}
 */
export const safeParseJSON = (json, fallback = null) => {
  try { return JSON.parse(json); }
  catch { return fallback; }
};

/**
 * Clamp a number between min and max.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
