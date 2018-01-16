const { Serializer } = require('jsonade');

module.exports = new Serializer('temptations', {
  attributes: ['id', 'name', 'imageUrl', 'gender', 'iq'],
});
