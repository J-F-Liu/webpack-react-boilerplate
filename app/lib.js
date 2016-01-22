Array.prototype.insertSeparator = function(sep) {
  if (this.length < 2) {
    return this;
  } else {
    var result = new Array(this.length * 2 - 1);
    for (var i = 0; i < this.length; i++) {
      result[i * 2] = this[i];
      if (i < this.length - 1) {
        result[i * 2 + 1] = sep;
      }
    }
    return result;
  }
}
