/**
 * invalidRequest.js
 * src/errors
 *
 * Created by samover on 13/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict';

const ApiError = require('./error');

class InvalidRequest extends ApiError {
    constructor(detail) {
        const title = 'Invalid Request';
        const status = 400;
        super(status, title, detail);
    }
}

module.exports = exports = InvalidRequest;
