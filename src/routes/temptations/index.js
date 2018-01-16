/**
 * index.js
 * src/routes/temptations
 *
 * Created by samover on 13/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict';

const router = require('express').Router({ mergeParams: true });
const Temptation = require('../../models').temptation;
const Sequelize = require('sequelize');
const DEFAULT_AMOUNT = 3;
const DEFAULT_GENDER = 'all';

router.get('/', async (req, res, next) => {
    try {
        const amount = parseInt(req.query.amount, 10) || DEFAULT_AMOUNT;
        const gender = req.query.gender || DEFAULT_GENDER;

        const temptations = await Temptation.findAll({
            where: { gender: { $in: gender === 'all' ? ['male', 'female'] : [gender] } },
            limit: amount,
            order: Sequelize.fn('RANDOM'),
        });

        const names = await Temptation.findAll({
            where: { gender: { $in: gender === 'all' ? ['male', 'female'] : [gender] } },
            attributes: ['name'],
        });
        const availableNames = names.map((item) => item.name);
        res.status(200).json({ temptations, amount, gender, availableNames });
    } catch (e) {
        next (e);
    }
});

module.exports = exports = router;
