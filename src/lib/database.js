/**
 * database.js
 * backend/src/lib
 *
 * Created by samover on 12/02/2017.
 * Copyright (c) 2016 iCapps. All rights reserved.
 */

'use strict';

const Sequelize = require('sequelize');

const sequelize = new Sequelize('test_db', 'test', 'test', {
  host: 'dockerhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

module.exports = exports = sequelize;
