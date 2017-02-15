'use strict';

module.exports = function(sequelize, DataTypes) {
  var USER = sequelize.define('USER', {
    name: DataTypes.STRING,
    temptationIq: DataTypes.INTEGER,
    gamesPlayed: DataTypes.INTEGER
  });

  return USER;
};
