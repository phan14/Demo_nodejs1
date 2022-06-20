"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
   
    */

    await queryInterface.bulkInsert(
      "User",
      [
        {
          email: "John Doe",
          password: "123",
          username: "fak1",
        },
        {
          email: "John Doe",
          password: "123",
          username: "fak2",
        },
        {
          email: "John Doe",
          password: "123",
          username: "fak3",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
