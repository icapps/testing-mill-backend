/**
 * temptation_test.js
 * test/models
 *
 * Created by samover on 13/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict';

const models = require('../../src/models' );
const name = 'Jean';
const imageUrl = 'http://test';
const gender = 'male';
const iq = 45;
const year = 2017;

function createTemptation() {
    return models.temptation.create({ name, imageUrl, gender, iq, year });
}

function createTemptationWithoutName() {
    return models.temptation.create({ imageUrl, gender, iq, year });
}

function createTemptationWithInvalidDataTypes() {
    return models.temptation.create({ name, iq: 'abc', gender, imageUrl, year });
}

describe('models/temptation', () => {
    context('valid creation', () => {
        let temptation;

        before(() => createTemptation().then((temptationObject) => temptation = temptationObject));
        after(() => temptation.destroy());

        it('has an id', () => {
            expect(temptation.id).to.be.a('number');
        });
        it('has a name', () => {
            expect(temptation.name).to.eql(name);
        });
        it('has an iq', () => {
            expect(temptation.iq).to.eql(iq);
        })
        it('has an imageUrl', () => {
            expect(temptation.imageUrl).to.eql(imageUrl);
        })
        it('has a gender', () => {
            expect(temptation.gender).to.eql(gender);
        })

        it('has a year', () => {
            expect(temptation.year).to.eql(year);
        })
    });

    context('invalid creation', () => {
        it('throws an error', () => expect(createTemptationWithoutName()).to.be.rejectedWith('null value'));
        it('throws an error', () => expect(createTemptationWithInvalidDataTypes()).to.be.rejectedWith('invalid input'));
    });
});
