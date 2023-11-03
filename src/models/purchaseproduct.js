'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchaseProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PurchaseProduct.belongsToMany(models.Product, {
        foreignKey: 'id',
        as: 'productPurchase',
        through: 'PurchaseProducts'
      })

      PurchaseProduct.belongsToMany(models.Purchase, {
        foreignKey: 'id',
        as: 'purchases',
        through: 'PurchaseProducts'
      })
    }
  }
  PurchaseProduct.init({
    purchaseId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'PurchaseProduct',
  });
  return PurchaseProduct;
};