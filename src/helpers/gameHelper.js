/**
 * gameHelper.js
 * src/helpers
 *
 * Created by samover on 13/02/2017.
 * Copyright (c) 2017 iCapps. All rights reserved.
 */

'use strict';

function getScore(questions, answers) {
    let scoreCount = 0;
    const numQuestions = 2 * questions.length;

    for (const question of questions) {
        const answer = answers.find((item) => item.temptationId === question.id);
        if (answer.name === question.name) scoreCount += 1;
        if (answer.iq === question.iq) scoreCount += 1;
    }

    return Number((scoreCount / numQuestions * 100).toFixed());
}

function getUserIq(score, userIq) {
    let newIq = userIq;

    if (score === 0) newIq += 50;
    else if (score < 50) newIq += Number((score / 10).toFixed());
    else newIq -= Number((score / 10).toFixed());

    return (newIq <= 0 ? 0 : newIq);
}

module.exports = exports = {
    getScore,
    getUserIq,
}
