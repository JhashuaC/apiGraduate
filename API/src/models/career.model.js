const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Career = sequelize.define('Career', {
  id_career: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  area: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: 'career',
  timestamps: false,
});

module.exports = Career;
