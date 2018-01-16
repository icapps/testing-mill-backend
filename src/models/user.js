'use strict';

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    temptationIq: DataTypes.INTEGER,
    gamesPlayed: DataTypes.INTEGER
  });

  return user;
};
