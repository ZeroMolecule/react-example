/**
 * @param {object} obj
 * @param {string[]} omitKeys
 * @returns {object}
 */
export const omit = (obj, omitKeys) => {
  return Object.keys(obj).reduce((result, key) => {
    if (omitKeys.indexOf(key) === -1) {
      result[key] = obj[key];
    }
    return result;
  }, {});
};

/**
 * @param {object} obj
 * @param {string[]} keys
 * @returns {object}
 */
export const pick = (obj, keys) => {
  return Object.keys(obj).reduce((result, key) => {
    if (keys.indexOf(key) !== -1) {
      result[key] = obj[key];
    }
    return result;
  }, {});
};
