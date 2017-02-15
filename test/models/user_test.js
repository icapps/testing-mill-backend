/**
 * user_test.js
 * test/models
 *
 * Created by samover on 13/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict';

const models = require('../../src/models' );
const userName = 'Jean';

function createUser(name) {
    return models.USER.create({ name: userName });
}

function createUserWithoutName() {
    return models.USER.create();
}

function createUserWithInvalidDataTypes() {
    return models.USER.create({ name: userName, temptationIq: 'abc' });
}

describe('models/user', () => {
    context('valid creation', () => {
        let user;

        before(() => createUser().then((userObject) => user = userObject));
        after(() => user.destroy());

        it('has a name', () => {
            expect(user.name).to.eql(userName);
        });
        it('has a default property temptationIq', () => {
            expect(user.temptationIq).to.be.a('number');
        })
        it('has a default property gamesPlayed', () => {
            expect(user.gamesPlayed).to.be.a('number');
        })
    });
    context('invalid creation', () => {
        it('throws an error', () => expect(createUserWithoutName()).to.be.rejectedWith('null value'));
        it('throws an error', () => expect(createUserWithInvalidDataTypes()).to.be.rejectedWith('invalid input'));
    });
});
