'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('books', 'updated_at');
  },
  down: (queryInterface) => {
    return queryInterface.addveColumn('books', 'updated_at',
    {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: false,
    },
  );
  },
};
