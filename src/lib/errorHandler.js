/**
 * errorHandler.js
 * lib
 *
 * Created by samover on 09/02/2017.
 * Copyright (c) 2016 iCapps. All rights reserved.
 */

'use strict';

const { ErrorSerializer } = require('jsonade');

module.exports = exports = (err, req, res, next) => {
    if (res.headersSent) return next(err);

    const error = Object.assign(err, { status: err.status || 500, title: err.message });
    res.status(error.status).send(ErrorSerializer.serialize([error]));
};
