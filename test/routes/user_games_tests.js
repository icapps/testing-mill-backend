/**
 * user_games_tests.js
 * test/routes
 *
 * Created by samover on 13/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict';

const app = require(`${process.cwd()}/src/server.js`);
const User = require('../../src/models').USER;
const Temptation = require('../../src/models').TEMPTATION;

describe('ROUTES: users/:id/games', () => {
    let user;
    let temptations;

    before(() => User.create({ name: faker.name.findName() })
        .then((userObj) => user = userObj)
        .then(() => Temptation.findAll({ limit: 3 }))
        .then((temptationsObj) => temptations = temptationsObj));

    after(() => User.destroy({ truncate: true, restartIdentity: true }));

    describe('POST /users/:id/games', () => {
        it('returns a 200 with JSON object containing game score and updated user', () => {
            const postObject = {
                game: {
                    answers: [
                        {
                            temptationId: temptations[0].id,
                            name: faker.name.findName(),
                            iq: 100,
                        },
                        {
                            temptationId: temptations[1].id,
                            name: temptations[1].name,
                            iq: temptations[1].iq,
                        },
                        {
                            temptationId: temptations[2].id,
                            name: temptations[2].name,
                            iq: 100,
                        },
                    ],
                },
            };

            return request(app)
                .post(`/users/${user.id}/games`)
                .send(postObject)
                .expect(200)
                .expect((res) => {
                    const updatedUser = res.body.user;
                    const game = res.body.game;

                    expect(game.score).to.be.a('number');
                    expect(updatedUser.id).to.eql(user.id);
                    expect(updatedUser.gamesPlayed).to.eql(user.gamesPlayed + 1);
                })
        });
    });
});
