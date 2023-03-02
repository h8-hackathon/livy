'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('Reports', 'postId', {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn('Reports', 'commentId', {
      type: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.changeColumn('Reports', 'postId', {
      type: Sequelize.INTEGER,
    });

    await queryInterface.changeColumn('Reports', 'commentId', {
      type: Sequelize.INTEGER,
    });

  }
};
