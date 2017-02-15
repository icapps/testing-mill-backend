/**
 * temptations_test.js
 * test/routes
 *
 * Created by samover on 13/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict';

console.log(process.cwd());
const app = require(`${process.cwd()}/src/server.js`);

describe('ROUTES: tempations', () => {
    describe('GET /temptations', () => {
        it('returns a 200 with JSON object containing default num of temptations', () =>
            request(app)
                .get('/temptations')
                .expect(200)
                .expect((res) => {
                    expect(res.body.temptations.length).to.eql(3);
                })
        );
        it('returns a 200 with JSON object containing 5 male temptations', () =>
            request(app)
                .get('/temptations?amount=5&gender=male')
                .expect(200)
                .expect((res) => {
                    expect(res.body.temptations.length).to.eql(5);
                    expect(res.body.gender).to.eql('male');
                    expect(res.body.amount).to.eql(5);
                    expect(res.body).to.have.a.property('availableNames');
                    for (const temptation of res.body.temptations) {
                        expect(temptation.gender).to.eql('male');
                    }
                })
        );
    });
});
