'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Colors', [
      {
        colorHex: "#ffff8d",
        num: 1,
        theme: 1
      },
      {
        colorHex: "#a5f2e9",
        num: 2,
        theme: 1
      },
      {
        colorHex: "#ffd5c8",
        num: 3,
        theme: 1
      },
      {
        colorHex: "#f6f0aa",
        num: 1,
        theme: 2
      },
      {
        colorHex: "#d3edd1",
        num: 2,
        theme: 2
      },
      {
        colorHex: "#f9d6c1",
        num: 3,
        theme: 2
      },
      {
        colorHex: "#f4ff40",
        num: 1,
        theme: 3
      },
      {
        colorHex: "#8affd7",
        num: 2,
        theme: 3
      },
      {
        colorHex: "#ffc477",
        num: 3,
        theme: 3
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Colors', null, {});
  }
};
