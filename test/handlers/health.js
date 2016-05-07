'use strict';

const expect = require('expect');

const dbMock = require('../../mocks/db');
const loggerMock = require('../../mocks/logger');
const resMock = require('../../mocks/res');
const isOk = require('../../handlers/health').isOk;

describe('handlers/health', () => {

  describe('isOk', () => {

    let db, logger, res, handler;

    beforeEach(() => {
      db = dbMock();
      logger = loggerMock();
      res = resMock();
      handler = isOk(db, logger);
    });

    it('responds 200 and logs notice if db does not error', () => {
      handler({}, res);
      expect(db.read.calls[0].arguments[0]).toBe(0);

      db.callback('read', null);
      expect(logger.info).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('HEALTHY');
    });

    it('responds 500 and logs emergency if db errors', () => {
      handler({}, res);

      db.callback('read', {statusCode: 500});
      expect(logger.critical).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('UNHEALTHY');
    });

  });

});
