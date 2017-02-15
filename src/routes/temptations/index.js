/**
 * index.js
 * src/routes/temptations
 *
 * Created by samover on 13/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict';

const router = require('express').Router({ mergeParams: true });
const Temptation = require('../../models').TEMPTATION;
const Sequelize = require('sequelize');
const DEFAULT_AMOUNT = 3;
const DEFAULT_GENDER = 'all';

router.get('/', (req, res) => {
    let temptations;
    let availableNames;

    const amount = parseInt(req.query.amount, 10) || DEFAULT_AMOUNT;
    const gender = req.query.gender || DEFAULT_GENDER;

    return Temptation.findAll({
        where: { gender: { $in: gender === 'all' ? ['male', 'female'] : [gender] } },
        limit: amount,
        order: Sequelize.fn('RANDOM'),
    })
        .then((result) => temptations = result)
        .then(() => Temptation.findAll({
            where: { gender: { $in: gender === 'all' ? ['male', 'female'] : [gender] } },
            attributes: ['name'],
        }))
        .then((names) => {
            availableNames = names.map((item) => item.name);
            res.send({ temptations, amount, gender, availableNames });
        })
});

module.exports = exports = router;
