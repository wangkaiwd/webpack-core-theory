const toType = (value) => Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
const isArray = (value) => Array.isArray(value);
const isPlainObject = (value) => toType(value) === 'object';

exports.isArray = isArray;
exports.isPlainObject = isPlainObject;
