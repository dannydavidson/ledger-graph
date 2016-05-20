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

    it('responds 200 and logs info if db does not error', () => {
      handler({}, res);
      expect(db.session.run.calls[0].arguments[0].trim()).toBe('MATCH (a) RETURN a LIMIT 1');
      expect(db.session.run.calls[0].arguments[1]).toBe(undefined);

      db.session.callThen()
        .then(() => {
          expect(logger.info).toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.send).toHaveBeenCalledWith('HEALTHY');
        });
    });

    it('responds 500 and logs critical if db errors', () => {
      handler({}, res);

      db.session.callCatch()
        .then(() => {
          expect(logger.critical).toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.send).toHaveBeenCalledWith('UNHEALTHY');
        });
    });

  });

});
