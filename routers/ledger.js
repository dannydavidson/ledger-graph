'use strict';

const Router = require('express').Router;
const transactions = require('../handlers/transactions');

module.exports = function(neo, logger) {
  const router = new Router();

  router.post('/transactions', transactions.create(neo, logger));
  router.route('/transactions/:id')
    .get(transactions.read(neo, logger))
    .put(transactions.update(neo, logger))
    .delete(transactions.delete(neo, logger));

  return router;
};
