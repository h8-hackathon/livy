'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let dataPosts = require('../data/Post.json');
    dataPosts.forEach((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('AdminPosts', dataPosts);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AdminPosts', null, {});
  },
};
