'use strict';

const Router = require('express').Router;
const transactions = require('../handlers/transactions');

module.exports = function(db, logger) {
  const router = new Router();

  router.post('/transactions', transactions.create(db, logger));
  router.route('/transactions/:id')
    .get(transactions.read(db, logger))
    .put(transactions.update(db, logger))
    .delete(transactions.delete(db, logger));

  return router;
};
