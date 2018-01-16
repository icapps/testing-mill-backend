/**
 * errorLogger.js
 * src/config
 *
 * Created by samover on 20/06/2017.
 */

const logger = require('express-bunyan-logger');

module.exports = exports = logger.errorLogger({
    name: 'logger',
    streams: [
        {
            level: 'info',
            stream: process.stdout
        },
    ],
    parseUA: false,
    excludes: ['req-headers', 'res-headers', 'response-hrtime', 'short-body'],
    obfuscate: ['body.iq']
});
