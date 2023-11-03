'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.PurchaseProduct, {
        foreignKey: 'productId',
        as: 'productPurchase',
        through: 'PurchaseProducts'
      })
    }
  }
  Product.init({
    lot: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    quantity: DataTypes.INTEGER,
    dateCreate: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Product',
  });

  return Product;
};