'use strict';

import bcrypt from "bcryptjs";

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Purchase, {
        foreignKey: 'userId',
        as: 'user'
      })
    }

    static encryptPassword = async (password) => {
      const salt = await bcrypt.genSalt(10)
      return await bcrypt.hash(password, salt)
    }

    static comparePassword = async (password, receivedPassword) => {
      return await bcrypt.compare(password, receivedPassword)
    }
  }
  User.init({
    name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    rol: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};