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
      Product.belongsTo(models.Category, { foreignKey: "categoryId", onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
      Product.belongsTo(models.User, { foreignKey: "authorId", onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    }
  }
  Product.init({
    categoryId: DataTypes.INTEGER,
    categoryName: DataTypes.STRING,
    sku: DataTypes.STRING,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Product name is required` },
        notEmpty: { msg: `Product name can't be empty` }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: `Description is required` },
        notEmpty: { msg: `Description can't be empty` }
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `Weight is required` },
        notEmpty: { msg: `Weight name can't be empty` }
      }
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `Width is required` },
        notEmpty: { msg: `Width name can't be empty` }
      }
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `Length is required` },
        notEmpty: { msg: `Length name can't be empty` }
      }
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `Height is required` },
        notEmpty: { msg: `Height name can't be empty` }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Image can't be empty` }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `Price is required` },
        notEmpty: { msg: `Price can't be empty` }
      }
    },
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};