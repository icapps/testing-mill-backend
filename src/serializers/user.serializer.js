const { Serializer } = require('jsonade');

module.exports = new Serializer('users', {
  attributes: ['id', 'name', 'temptationIq', 'gamesPlayed'],
  keyForAttribute: 'camelCase',
});

