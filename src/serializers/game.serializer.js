const { Serializer } = require('jsonade');
const userSerializer = require('./user.serializer');

module.exports = new Serializer('games', {
  attributes: ['score', 'user'],
  user: userSerializer,
});
