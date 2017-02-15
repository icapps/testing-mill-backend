/**
 * error.js
 * src/errors
 *
 * Created by samover on 13/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict';

class ApiError extends Error {
    constructor(status, title, detail) {
        super(title);
        this.status = status;
        this.detail = detail;
    }
}

module.exports = exports = ApiError;
