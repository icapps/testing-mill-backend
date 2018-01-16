/**
 * games.js
 * src/routes/users
 *
 * Created by samover on 13/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict';

const router = require('express').Router({ mergeParams: true });
const Temptation = require('../../models').temptation;
const { game: gameSerializer } = require('../../serializers');
const errors = require('../../errors');
const User = require('../../models').user;
const gameHelper = require('../../helpers/gameHelper');

const DEFAULT_AMOUNT = 3;
const DEFAULT_GENDER = 'all';

router.post('/', async (req, res, next) => {
    let user;
    let score;

    try {
        const userId = parseInt(req.params.id, 10);
        const answers = req.body.game.answers;
        const temptationIds = answers.map((item) => item.temptationId);

        if (!userId || answers.length !== temptationIds.length) throw new errors.InvalidRequest();

        const user = await User.findById(userId)
        if (user === null) throw new errors.ResourceNotFound('User not found');

        const temptations = await Temptation.findAll({ where: { id: { $in: temptationIds } } });
        const score = gameHelper.getScore(temptations, answers);

        user.temptationIq = gameHelper.getUserIq(score, user.temptationIq);
        user.gamesPlayed += 1;
        await user.save();

        res.send(gameSerializer.serialize({ score , user }));
    } catch (e) {
        next (e);
    }
});

module.exports = exports = router;
