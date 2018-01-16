const { Serializer } = require('jsonade');
const temptationSerializer = require('./temptation.serializer')

module.exports = new Serializer('questions', {
  attributes: ['amount', 'gender', 'availableNames', 'temptations'],
  temptations: temptationSerializer,
});
