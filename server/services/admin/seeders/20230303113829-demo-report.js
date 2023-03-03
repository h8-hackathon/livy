'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let dataReports = require('../data/report.json');
    dataReports.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Reports', dataReports);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reports', null, {});
  },
};
