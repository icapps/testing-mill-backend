/**
 * games.js
 * src/routes/users
 *
 * Created by samover on 13/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict';

const router = require('express').Router({ mergeParams: true });
const Temptation = require('../../models').TEMPTATION;
const errors = require('../../errors');
const User = require('../../models').USER;
const gameHelper = require('../../helpers/gameHelper');

const DEFAULT_AMOUNT = 3;
const DEFAULT_GENDER = 'all';

router.post('/', (req, res) => {
    let user;
    const userId = parseInt(req.params.id, 10);
    const answers = req.body.game.answers;
    const temptationIds = answers.map((item) => item.temptationId);

    if (!userId || answers.length !== temptationIds.length) throw new errors.InvalidRequest();

    return User.findById(userId)
        .then((userObject) => user = userObject)
        .then(() => Temptation.findAll({ where: { id: { $in: temptationIds } } }))
        .then((temptations) => {
            const score = gameHelper.getScore(temptations, answers);
            user.temptationIq = gameHelper.getUserIq(score, user.temptationIq);
            user.gamesPlayed += 1;
            res.send({ game: { score }, user });
        });
});

module.exports = exports = router;
