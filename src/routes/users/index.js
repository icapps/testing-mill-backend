/**
 * index.js
 * src/routes/users
 *
 * Created by samover on 13/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict';

const router = require('express').Router({ mergeParams: true });
const User = require('../../models').user;
const userSerializer = require('../../serializers/user.serializer');
const errors = require('../../errors');
const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;

const gamesRouter = require('./games');

router.get('/', async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit, 10) || DEFAULT_LIMIT;
        const offset = parseInt(req.query.offset, 10) || DEFAULT_OFFSET;

        const { count: totalCount, rows: users } = await User.findAndCountAll({ limit, offset });
        res.send(userSerializer.serialize(users, { totalCount }));
    } catch (e) {
        next(e);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const userName = req.body.name;
        if (!userName) throw new errors.InvalidRequest('A user must have a name');

        const user = await User.findOrCreate({ where: { name: userName }})
        res.send(userSerializer.serialize(user[0]));
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const userId = req.params.id;

        const user = await User.find({ where: { id: userId } })
        if (user === null) throw new errors.ResourceNotFound('User not found');
        res.send(userSerializer.serialize(user));
    } catch (e) {
        next(e);
    }
});

router.use('/:id/games', gamesRouter);

module.exports = exports = router;
