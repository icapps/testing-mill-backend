/**
 * gameHelper_test.js
 * test/helpers
 *
 * Created by samover on 13/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict';

const gameHelper = require('../../src/helpers/gameHelper');

const questions = [
    {
        id: 30,
        name: "Pommeline",
        gender: "female",
        iq: 58,
    },
    {
        id: 31,
        name: "Parastoo",
        gender: "female",
        iq: 49,
    },
    {
        id: 32,
        name: "Saartje",
        gender: "female",
        iq: 73,
    }
]

const answers = [
    {
        temptationId: 30,
        name: "Jessica",
        iq: 58,
    },
    {
        temptationId: 31,
        name: "Parastoo",
        iq: 49,
    },
    {
        temptationId: 32,
        name: "Saartje",
        iq: 105,
    }
];

describe('helpers/gameHelper', () => {
    describe('#getScore', () => {
        it('returns the score for the game in percentage', () => {
            expect(gameHelper.getScore(questions, answers)).to.eql(67);
        });
    });
    describe('#getUserIq', () => {
        it('returns the new userIq based on the game score', () => {
            const userIq = 100;
            expect(gameHelper.getUserIq(67, userIq)).to.eql(93);
        });
        it('returns 0 if userIq is <= 0', () => {
            const userIq = 0;
            expect(gameHelper.getUserIq(67, userIq)).to.eql(0);
        });
    });
});
