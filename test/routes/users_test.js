/**
 * users_test.js
 * test/routes
 *
 * Created by samover on 13/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict';

const app = require(`${process.cwd()}/src/server.js`);
const User = require('../../src/models').user;

describe('ROUTES: users', () => {
    let users = [];

    before(() => {
        for (let i = 0; i < 30; i += 1) {
            users.push(User.create({
                name: faker.name.findName(),
                gamesPlayed: faker.random.number(100),
                temptationIq: faker.random.number(150),
            }));
        }

        return Promise.all(users).then((userResult) => users = userResult);
    })

    after(() => User.destroy({ truncate: true, restartIdentity: true }));

    describe('GET /users', () => {
        it('returns a 200 with JSON object containing paged users', () =>
            request(app)
                .get('/users')
                .expect(200)
                .expect((res) => {
                    expect(res.body.meta.count).to.eql(20);
                    expect(res.body.meta.totalCount).to.eql(30);
                    expect(res.body.data.length).to.eql(20);
                })
        );
        it('returns a 200 with JSON object containing users with offset and limit', () =>
            request(app)
                .get('/users?limit=5&offset=5')
                .expect(200)
                .expect((res) => {
                    expect(res.body.meta.count).to.eql(5);
                    expect(res.body.meta.totalCount).to.eql(30);
                    expect(res.body.data.length).to.eql(5);
                })
        );
    });

    describe('GET /users/:id', () => {
        it('returns a 200 with the corresponding user', () =>
            request(app)
                .get(`/users/${users[0].id}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body.data.id).to.eql(users[0].id);
                })
        );
        it('returns a 404 user is not found', () =>
            request(app)
            .get('/users/100000')
                .expect(404)
            .then(({ body }) => {
                console.log('@@@@@@@@@@@@@@@@@@@@@');
                console.log('body', JSON.stringify(body, null, 2));
                console.log('@@@@@@@@@@@@@@@@@@@@@');
            })
        );
        it('returns a 500 when userId is not an integer', () =>
            request(app)
            .get('/users/abc')
                .expect(500)
        );
    });
    describe('POST /users', () => {
        it('returns a 200 with newly created user', () =>
            request(app)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send({ name: 'Jason' })
                .expect(200)
                .expect((res) => {
                    expect(res.body.data.name).to.eql('Jason');
                    expect(res.body.data).to.have.a.property('id');
                    expect(res.body.data).to.have.a.property('temptationIq');
                    expect(res.body.data).to.have.a.property('gamesPlayed');
                })
        );

        it('returns a 200 with existing user if it already exists', () => {
            let userId;

            return request(app)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send({ name: 'Dovile' })
                .expect(200)
                .expect((res) => {
                    expect(res.body.data.name).to.eql('Dovile');
                    userId = res.body.data.id;
                })
                .then(() => request(app)
                .post('/users')
                .send({ name: 'Dovile' })
                .expect(200)
                .expect((res) => expect(res.body.data.id).to.eql(userId)));
        });

        it('returns a 400 when name is missing', () =>
            request(app)
                .post('/users')
                .set('Content-Type', 'application/json')
                .send({ iq: 100 })
                .expect(400)
        );
    });
});
