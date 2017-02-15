/**
 * index.js
 * src/errors
 *
 * Created by samover on 13/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict';

const ResourceNotFound = require('./resourceNotFound');
const InvalidRequest = require('./invalidRequest');

module.exports = exports = {
    ResourceNotFound,
    InvalidRequest,
}
