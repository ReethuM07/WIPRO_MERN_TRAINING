const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Enrollment = sequelize.define('Enrollment', {
  paymentAmount: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Enrollment;
