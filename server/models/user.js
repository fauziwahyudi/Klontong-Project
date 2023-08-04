'use strict';

const { hashPassword } = require('../helpers/bcrypt');

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
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Username is required` },
        notEmpty: { msg: `Username can't be empty` },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: `Email must be unique`
      },
      validate: {
        notNull: { msg: `Email is required` },
        notEmpty: { msg: `Email can't be empty` },
        isEmail: {
          msg: "Invalid email format"
        },
        
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Password is required` },
        notEmpty: { msg: `Password can't be empty` },
        len : {
          args : 5,
          msg : "Password must be 5 characters"
        }
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password)
  })
  return User;
};