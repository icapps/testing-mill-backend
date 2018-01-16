/**
 * logger.js
 * config
 *
 * Created by samover on 09/02/2017.
 * Copyright (c) 2016 iCapps. All rights reserved.
 */

const logger = require('express-bunyan-logger');

module.exports = exports = logger({
    name: 'logger',
    streams: [
        {
            level: 'info',
            stream: process.stdout
        },
        {
            path: './log/trace.log',
            level: 'trace'
        }
    ],
    parseUA: true,
    excludes: ['Connection', 'req-headers', 'res-headers', 'response-hrtime', 'short-body'],
    obfuscate: ['body.iq']
});
