'use strict';

const expect = require('expect');

const loggerMock = require('../../mocks/logger');
const resMock = require('../../mocks/res');
const version = require('../../handlers/version');

describe('handlers/version', () => {

  let v, logger, res, handler;

  beforeEach(() => {
    v = '123';
    logger = loggerMock();
    res = resMock();
    handler = version(v, logger);
  });

  it('responds 200 with version json and logs notice ', () => {
    handler({}, res);

    expect(logger.notice).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.calls[0].arguments[0].version).toBe(v);
  });

});
