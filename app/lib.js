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
