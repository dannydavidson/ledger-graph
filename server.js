'use strict';

const fs = require('fs');
const express = require('express');
const seraph = require('seraph');
const winston = require('winston');

const MOUNT_PATH = process.env.MOUNT_PATH || '';

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

let version;

try {
  version = fs.readFileSync('./VERSION', 'utf-8').trim();
} catch (e) {
  version = 'local';
}
version = require('./handlers/version')(version, logger);

app.set('trust proxy', true);
logger.setLevels(winston.config.syslog.levels);

app.get('/', (req, res) => res.status(200).end());

app.use((req, res, next) => {
  logger.info('app.MOUNT_PATH', MOUNT_PATH);
  logger.info('request.route', req.route);
  logger.info('request.path', req.path);
  logger.info('request.hostname', req.hostname);
  logger.info('request.protocol', req.protocol);
  logger.info('request.ip', req.ip);
  next();
});

app.get(MOUNT_PATH + '/', version);
app.get(MOUNT_PATH + '/ok', require('./handlers/health').isOk(db, logger));

app.use(MOUNT_PATH + '/ledger', require('./routers/ledger')(db, logger));

app.use((req, res) => {
  logger.info('404 req.originalUrl', req.originalUrl);
  logger.info('404 req.path', req.path);
  res.status(404).json({
    error: 'Not Found'
  });
});

app.listen(process.env.PORT || 11235, () => {
  logger.info('Server started.');
});
