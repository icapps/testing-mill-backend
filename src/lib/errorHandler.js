/**
 * errorHandler.js
 * lib
 *
 * Created by samover on 09/02/2017.
 * Copyright (c) 2016 iCapps. All rights reserved.
 */

'use strict';

module.exports = exports = (err, req, res, next) => {
    if (res.headersSent) return next(err);

    res.status(err.status || 500).send({
        errors: {
            title: err.message,
            status: err.status || 500,
            detail: err.detail,
        }
    });
};
