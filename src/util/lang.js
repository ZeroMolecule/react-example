import get from "lodash/get";

/**
 * @param {object} classes
 * @returns {string}
 */
export const classNames = classes =>
  Object.entries(classes)
    .filter(([key, value]) => value)
    .map(([key]) => key)
    .join(" ");

/**
 * @param {array} arr
 * @param {string} key
 * @param {boolean} [removeKey=false]
 * @returns {object}
 */
export const arrayToObject = (arr, key, removeKey = false) =>
  arr.reduce((obj, item) => {
    const itemKey = get(item, key);
    let newItem = { ...item };
    if (removeKey) {
      delete newItem[key];
    }
    if (itemKey) {
      obj[item[key]] = newItem;
    }
    return obj;
  }, {});
