'use strict';

exports.isOk = function(db, logger) {
  return (req, res) => {
    db.read(0, function(err) {
      if (err && err.statusCode !== 404) {
        logger.emerg('Neo4j connection failed', err);
        return res.status(500).end();
      }

      logger.notice('Health Checked Successfully');
      res.status(200).end();
    });
  };
};
