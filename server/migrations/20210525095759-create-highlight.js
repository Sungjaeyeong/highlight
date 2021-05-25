'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Highlights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      payload: {
        type: Sequelize.STRING
      },
      colorHex: {
        type: Sequelize.STRING
      },
      colorNum: {
        type: Sequelize.INTEGER
      },
      pageId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Highlights');
  }
};