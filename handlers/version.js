'use strict';

module.exports = function(version, logger) {
  return (req, res) => {
    res.status(200).json({
      version: version
    });
    logger.notice('Version is ' + version);
  };
};
