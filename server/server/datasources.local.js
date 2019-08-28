'use strict';
var envs = require('./env.js');

module.exports = {
  db: {
    url: envs.db_url,
    name: 'db',
    connector: 'mongodb',
  },
};
