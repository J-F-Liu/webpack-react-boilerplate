Array.prototype.insertSeparator = function (sep) {
  if (this === null || this.length < 2) return this;
  let result = new Array(this.length * 2 - 1);
  for (let i = 0; i < this.length; i++) {
    result[i * 2] = this[i];
    if (i < this.length - 1) {
      result[i * 2 + 1] = sep;
    }
  }
  return result;
};

if (!Array.prototype.find) {
  Array.prototype.find = function (predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    const list = Object(this);
    const length = list.length >>> 0;
    let value;

    for (let i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(null, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

/**
 * @param {string} string
 * @param {number} index
 * @param {string} substring
 * @returns {string} New string
 */
export function insertString(string, index, substring) {
  return [string.slice(0, index), substring, string.slice(index)].join("");
}
