'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const users = require("../data/users.json").map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.password = hashPassword(el.password)
      return el
    })

    const categories = require("../data/categories.json").map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      delete el.id;
      return el
    })

    const products = require("../data/products.json").map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      delete el.id;
      return el
    })

    await queryInterface.bulkInsert('Users', users, {});
    await queryInterface.bulkInsert('Categories', categories, {});
    await queryInterface.bulkInsert('Products', products, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Products', null, {});
  }
};
