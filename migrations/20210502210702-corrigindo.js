'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('books', 'synopsis', {
        type: Sequelize.TEXT,
        allowNull: true
      }),
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([queryInterface.changeColumn('books', 'synopsis')]);
  },
};
