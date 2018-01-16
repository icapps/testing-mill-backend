'use strict';
module.exports = function(sequelize, DataTypes) {
  var temptation = sequelize.define('temptation', {
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    gender: DataTypes.STRING,
    iq: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return temptation;
};
