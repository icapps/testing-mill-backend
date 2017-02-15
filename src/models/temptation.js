'use strict';
module.exports = function(sequelize, DataTypes) {
  var TEMPTATION = sequelize.define('TEMPTATION', {
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    gender: DataTypes.STRING,
    iq: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return TEMPTATION;
};
