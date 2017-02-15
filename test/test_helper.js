/**
 * test_helper.js
 * test
 *
 * Created by samover on 09/02/2017.
 * Copyright (c) 2016 iCapps. All rights reserved.
 */

'use strict';

const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
// const chaiThings = require('chai-things');
const sinonChai = require('sinon-chai');
// const dateTime = require('chai-datetime');
// const dirtyChai = require('dirty-chai');
// const mock = require('mock-require');

chai.config.includeStack = true;
chai.config.showDiff = true;
chai.use(chaiAsPromised);
chai.use(sinonChai);
// chai.use(dirtyChai);
// chai.use(dateTime);
// chai.use(chaiThings);

// Define a global 'base' function for 'absolute' require-paths from the root of the project.
// global.base = path => `${__dirname}/../${path}`;
global.expect = chai.expect;
global.sinon = sinon;
// global.nock = require('nock');
global.request = require('supertest-as-promised');
// global.mock = mock;
// global.joi = require('joi');
global.faker = require('faker');
// global.proxyquire = require('proxyquire');

// nock.disableNetConnect();
// nock.enableNetConnect(/127.0.0.1|localhost|app/);

/** = IMPORTS =================================================================================== */
require('dotenv').config();

// MOCKS FOR EXTERNAL SERVICES
// const pushStub = sinon.stub().returns(Promise.resolve());
// const twilioStub = sinon.stub().yields();
// const mandrillStub = sinon.stub().returns(Promise.resolve());

// const pushAdapterMock = function PushAdapterMock() {
//     return {
//         send: pushStub,
//     };
// };

// const mandrillMock = function MandrillMock() {
//     return {
//         messages: {
//             send: mandrillStub,
//         },
//     };
// };

// const twilioMock = function MandrillMock() {
//     return {
//         messages: {
//             create: twilioStub,
//         },
//     };
// };

// mock('parse-server-push-adapter', { ParsePushAdapter: pushAdapterMock });
// mock('mandrill-api/mandrill', { Mandrill: mandrillMock });
// mock('twilio', { RestClient: twilioMock });

// global.mandrillStub = mandrillStub;
// global.twilioStub = twilioStub;
// global.pushStub = pushStub;
