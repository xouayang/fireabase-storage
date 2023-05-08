const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const OrderDetails = sequelize.define(
  "orderDetails",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    order: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    product: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);
module.exports = OrderDetails;
