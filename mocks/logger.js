'use strict';

const expect = require('expect');

module.exports = function() {
  let mock = {};

  mock.emerg = expect.createSpy().andReturn(mock);
  mock.alert = expect.createSpy().andReturn(mock);
  mock.crit = expect.createSpy().andReturn(mock);
  mock.error = expect.createSpy().andReturn(mock);
  mock.warning = expect.createSpy().andReturn(mock);
  mock.notice = expect.createSpy().andReturn(mock);
  mock.info = expect.createSpy().andReturn(mock);
  mock.debug = expect.createSpy().andReturn(mock);

  return mock;
};
