# ledger-graph
[![Circle CI](https://circleci.com/gh/dannydavidson/ledger-graph/tree/master.svg?style=svg)](https://circleci.com/gh/dannydavidson/ledger-graph/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/dannydavidson/ledger-graph/badge.svg?branch=master)](https://coveralls.io/github/dannydavidson/ledger-graph?branch=master)

POC ledger and reporting API using neo4j

## Install
- Install [Docker](https://docs.docker.com/engine/installation/mac/)
- Export environment variables for neo4j user/pass
  - `export DB_USER=neo4j`
  - `export DB_PASS={PASSWORD_YOU_RESET_IN_NEO4J_CONSOLE}`
- Run `docker-compose up`
