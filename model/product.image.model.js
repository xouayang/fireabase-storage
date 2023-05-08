const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const ProductImage = sequelize.define(
  "productImages",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    product: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: true,
  }
);
module.exports = ProductImage;
