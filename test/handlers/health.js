'use strict';

const expect = require('expect');

const dbMock = require('../../mocks/db');
const loggerMock = require('../../mocks/logger');
const resMock = require('../../mocks/res');
const isOk = require('../../handlers/health').isOk;

describe('handlers/health', () => {

  describe('isOk', () => {

    it('responds 200 and logs notice if db does not error', () => {
      let db = dbMock();
      let logger = loggerMock();
      let res = resMock();
      let handler = isOk(db, logger);

      handler({}, res);
      expect(db.read.calls[0].arguments[0]).toBe(0);

      db.callback('read', null);
      expect(logger.notice).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.end).toHaveBeenCalled();
    });

    it('responds 500 and logs emergency if db errors', () => {
      let db = dbMock();
      let logger = loggerMock();
      let res = resMock();
      let handler = isOk(db, logger);

      handler({}, res);

      db.callback('read', {statusCode: 500});
      expect(logger.emerg).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.end).toHaveBeenCalled();
    });

  });

});
