const forEach = (obj, cb) => {
  Object.keys(obj).forEach((key) => {
    cb(key, obj[key]);
  });
};
module.exports = {
  forEach
};
