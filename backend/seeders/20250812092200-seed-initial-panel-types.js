"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "PanelTypes",
      [
        { name: "Top Panel", createdAt: new Date(), updatedAt: new Date() },
        { name: "Base Panel", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "Left Side Panel",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Right Side Panel",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Back Side Panel",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("PanelTypes", null, {});
  },
};
