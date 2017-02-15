/**
 * index.js
 * src/routes/users
 *
 * Created by samover on 13/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict';

const router = require('express').Router({ mergeParams: true });
const User = require('../../models').USER;
const errors = require('../../errors');
const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;

const gamesRouter = require('./games');

router.get('/', (req, res, next) => {
    const limit = parseInt(req.query.limit, 10) || DEFAULT_LIMIT;
    const offset = parseInt(req.query.offset, 10) || DEFAULT_OFFSET;

    return User.findAll({
        limit,
        offset
    }).then((users) => {
        res.send({ users, limit, offset });
    })
});

router.post('/', (req, res, next) => {
    const userName = req.body.name;

    if (!userName) throw new errors.InvalidRequest('A user must have a name');

    return User.findOrCreate({ where: { name: userName }})
        .then((user) => res.send({ user: user[0] }));
});

router.get('/:id', (req, res, next) => {
    const userId = req.params.id;

    return User.find({ where: { id: userId } })
        .then((user) => {
            if (user === null) throw new errors.ResourceNotFound('User not found');
            res.send({ user });
        })
        .catch((err) => next(err));
});

router.use('/:id/games', gamesRouter);

module.exports = exports = router;
