'use strict';

const fs = require('fs');
const express = require('express');
const seraph = require('seraph');
const winston = require('winston');

const app = express();
const db = seraph({
  server: process.env.DB_ADDRESS || 'http://neo4j:7474',
  user: process.env.DB_USER || 'neo4j',
  pass: process.env.DB_PASS || 'neo4j'
});
const logger = new winston.Logger({
  transports: [
    new winston.transports.Console()
  ]
});

let v;

try {
  v = fs.readFileSync('./VERSION', 'utf-8').trim();
} catch (e) {}

logger.setLevels(winston.config.syslog.levels);

app.get('/v', require('./handlers/version')(v || 'local', logger));
app.get('/ok', require('./handlers/health').isOk(db, logger));
app.use('/ledger', require('./routers/ledger')(db, logger));

app.listen(process.env.PORT || 11235, () => {
  logger.info('Server started.');
});
