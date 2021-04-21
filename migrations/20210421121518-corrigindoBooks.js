'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('books', 'created_at');
  },
  down: (queryInterface) => {
    return queryInterface.addveColumn('books', 'created_at',
    {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  );
  },
};
