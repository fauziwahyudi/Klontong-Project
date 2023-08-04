'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references : {
          model: "Categories",
          key : "id"
        }
      },
      categoryName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sku: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      weight: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      width: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      length: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      height: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};