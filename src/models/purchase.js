'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Purchase.belongsTo(models.User, {
        as: 'user'
      })

      Purchase.belongsToMany(models.PurchaseProduct, {
        foreignKey: 'purchaseId',
        as: 'purchases',
        through: 'PurchaseProducts'
      })
    }
  }
  Purchase.init({
    userId: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL(10, 2),
    dateCreate: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Purchase',
  });
  return Purchase;
};