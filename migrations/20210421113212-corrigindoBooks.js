'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('books', 'is_it_public');
  },
  down: (queryInterface) => {
    return queryInterface.addveColumn('books', 'is_it_public',
    {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  );
  },
};
