'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let dataCounselors = require('../data/counselorsubmission.json');
    dataCounselors.forEach((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('CounselorSubmissions', dataCounselors);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CounselorSubmissions', null, {});
  },
};
