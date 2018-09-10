/**
 * @param {number|string} val
 * @param {string|RegExp} [separator=","]
 * @returns {string}
 */
export const addThousandSeparator = (val, separator = ',') => {
  const [integer, decimal] = val.toString().split('.');

  const integerWithSeparator = integer
    .split('')
    .reverse()
    .reduce((s, c, i) => {
      if (i % 3 === 0 && i >= 1) {
        s.push(`${c}${separator}`);
      } else {
        s.push(c);
      }
      return s;
    }, [])
    .reverse()
    .join('');

  return `${integerWithSeparator}${decimal ? `.${decimal}` : ''}`;
};
