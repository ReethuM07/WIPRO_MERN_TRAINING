const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Profile = sequelize.define('Profile', {
  phone: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  }
});

module.exports = Profile;
