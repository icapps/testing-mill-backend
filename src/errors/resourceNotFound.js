/**
 * resourceNotFound.js
 * src/errors
 *
 * Created by samover on 13/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict';

const ApiError = require('./error');

class ResourceNotFound extends ApiError {
    constructor(detail) {
        const title = 'The resource cannot be found';
        const status = 404;
        super(status, title, detail);
    }
}

module.exports = exports = ResourceNotFound;
