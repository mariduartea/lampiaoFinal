'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('books', 'is_it_public',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    );
  },
  down: (queryInterface) => {
    return queryInterface.removeColumn('books', 'is_it_public');
  },
};
