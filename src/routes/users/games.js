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

router.post('/', (req, res, next) => {
    let user;
    let score;

    const userId = parseInt(req.params.id, 10);
    const answers = req.body.game.answers;
    const temptationIds = answers.map((item) => item.temptationId);

    if (!userId || answers.length !== temptationIds.length) throw new errors.InvalidRequest();

    return User.findById(userId)
        .then((userObject) => {
            if (userObject === null) throw new errors.ResourceNotFound('User not found');
            user = userObject;
        })
        .then(() => Temptation.findAll({ where: { id: { $in: temptationIds } } }))
        .then((temptations) => {
            score = gameHelper.getScore(temptations, answers);
            user.temptationIq = gameHelper.getUserIq(score, user.temptationIq);
            user.gamesPlayed += 1;
            return user.save();
        })
        .then((updatedUser) => res.send({ game: { score }, user }))
        .catch((err) => next(err));
});

module.exports = exports = router;
