'use strict';

exports.isOk = function(db, logger) {
  return (req, res) => {
    res.status(200).send('HEALTHY');
    // db.read(0, (err) => {
    //   if (err && err.statusCode !== 404) {
    //     logger.emerg('Neo4j connection failed', err);
    //     return res.status(500).send('UNHEALTHY');
    //   }
    //
    //   logger.notice('Health Checked Successfully');
    //   res.status(200).send('HEALTHY');
    // });
  };
};
