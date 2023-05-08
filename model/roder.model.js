const { DataTypes } = require('sequelize');
const sequelize = require('../config/db')
const Order = sequelize.define('orders', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue:DataTypes.UUIDV4,
    primaryKey:true
  },
  user: {
    type: DataTypes.UUID,
    allowNull:false
  }
}, {
  sequelize,
  timestamps:true
});
module.exports = Order;