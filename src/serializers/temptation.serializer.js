const { Serializer } = require('jsonade');

module.exports = new Serializer('temptations', {
  attributes: ['answers'],
  keyForAttribute: 'camelCase',
});
