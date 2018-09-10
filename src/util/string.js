/**
 * @param {string} value
 * @return string
 */
export const capitalizeFirstLetter = value => {
  return value[0].toUpperCase() + value.slice(1);
};

/**
 * @param {string} value
 * @param {string|RegExp} [separator="_"]
 */
export const toCamelCase = (value, separator = '_') => {
  const lowercase = value.toLowerCase().split(separator);
  return lowercase.reduce((camelCaseString, item, i) => {
    if (i === 0) {
      return (camelCaseString += item);
    }
    return (camelCaseString += capitalizeFirstLetter(item));
  }, '');
};
