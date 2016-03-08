'use strict';

const expect = require('expect');

module.exports = function() {
  let callbacks = {};
  let mock = {
    read: function(cmd, cb) {
      callbacks.read = cb;
    },
    callback: function(method) {
      callbacks[method].apply(null, Array.prototype.slice.call(arguments, 1));
    }
  };

  expect.spyOn(mock, 'read').andCallThrough();

  return mock;
};
