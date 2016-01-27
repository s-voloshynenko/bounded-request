var request = require('request');
var _Promise = require('promise');

/**
 * TODO:
 * 1. Use native http module.
 * 2. Module should have separate methods which similar to HTTP methods.
 * 3. Add payload validation (tv4, etc.).
 * 4. Should we use `bluebird` instead of `promise`?
 */

/**
 * @param {Object} options - Request options.
 * @param {string} options.url - Request url.
 * @param {string} options.query - Request query.
 * @param {boolean} options.json - Should body be a JSON-serializable object?
 */
module.exports = function(options) {
  var json = options.json || false;

  return new _Promise(function(resolve, reject) {
    request({ url: options.url, qs: options.query, json: json }, function(err, res, body) {
      if (err) {
        return reject(err);
      } else if (res.statusCode !== 200) {
        err = new Error('Unexpected status code: ' + res.statusCode);
        err.res = res;
        return reject(err);
      }
      resolve(body);
    });
  });
};
