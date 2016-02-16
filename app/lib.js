Array.prototype.insertSeparator = function(sep) {
  if (this === null || this.length < 2) {
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

if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}
