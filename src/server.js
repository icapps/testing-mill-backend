/**
 * server.js
 * .
 *
 * Created by samover on 09/02/2017.
 * Copyright (c) 2016 iCapps. All rights reserved.
 */

'use strict';

const express = require('express');
// const smsFallback = require('./services/smsFallback');

/*
 * MODULE CONFIGURATION
 */
require('./config/environment');
const bodyParser = require('./config/bodyParser');
const helmet = require('./config/helmet');
const logger = require('./config/logger');

/*
 * CONSTANT DECLARATION
 */
const port = process.env.PORT || 3000;

/*
 * LIBRARIES
 */
const errorHandler = require('./lib/errorHandler');

/*
 * APP INITIALIAZATION
 */
const app = express();

app.use(helmet);
app.use(bodyParser);

if (process.env.NODE_ENV !== 'test') app.use(logger);

/*
 * ROUTE DECLARATIONS
 */

const temptationsRouter = require('./routes/temptations');
const usersRouter = require('./routes/users');

app.use('/temptations', temptationsRouter);
app.use('/users', usersRouter);

// Catch all unknown routes.
app.all('*', (req, res, next) => res.sendStatus(404));

app.use(errorHandler);

/*
 * START SERVER
 */

app.listen(port, () => {
  console.info(`Server listening on port ${port}`);
});

module.exports = exports = app;
