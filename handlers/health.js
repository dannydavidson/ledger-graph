'use strict';

exports.isOk = function(db, logger) {
  return (req, res) => {
    db.read(0, (err) => {
      if (err && err.statusCode !== 404) {
        logger.critical('Neo4j connection failed', err);
        return res.status(500).send('UNHEALTHY');
      }

      logger.debug('Test Debug');
      logger.info('Health Checked Successfully');
      logger.warning('Test Warning');
      logger.error('Test Error');
      logger.critical('Test Critical');

      res.status(200).send('HEALTHY');
    });
  };
};
