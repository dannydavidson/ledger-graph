'use strict';

const fs = require('fs');
const express = require('express');
const seraph = require('seraph');
const winston = require('winston');
const cors = require('cors');
const jwt = require('express-jwt');

// Pass when sitting behind load-balancer on a route (e.g. '/ledger-graph')
const MOUNT_PATH = process.env.MOUNT_PATH || '';

// Initialize app, neo4j connection, logger and auth
const app = express();
const db = seraph({
  server: process.env.DB_ADDRESS || 'http://neo4j:7474',
  user: process.env.DB_USER || 'neo4j',
  pass: process.env.DB_PASS || 'neo4j'
});
const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      json: true,
      stringify: true
    })
  ]
});
const auth = jwt({
  secret: new Buffer(process.env.AUTH_CLIENT_SECRET || '', 'base64'),
  audience: process.env.AUTH_CLIENT_ID || ''
});

// Pull version from file if available
let version;

try {
  version = fs.readFileSync('./VERSION', 'utf-8').trim();
} catch (e) {
  version = 'local';
}

// trust the proxies
app.set('trust proxy', true);

// syslog levels play nice
logger.setLevels(winston.config.syslog.levels);

// set CORS
app.use(cors());

// Respond 200 at '/' to satisfy backend healthchecks
app.get('/', (req, res) => res.status(200).end());

// set up jwt auth
app.use(auth);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      error: 'Not Authorized'
    });
  }
});

// set up system info routes
app.get(MOUNT_PATH + '/', require('./handlers/version')(version, logger));
app.get(MOUNT_PATH + '/ok', require('./handlers/health').isOk(db, logger));

// set up routers to support API
app.use(MOUNT_PATH + '/ledger', require('./routers/ledger')(db, logger));

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found'
  });
});

// Start it up
app.listen(process.env.PORT || 11235, () => {
  logger.info('Server started.');
});
