'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'updated_at');
    return queryInterface.removeColumn('users', 'created_at');
  },
  down: (queryInterface) => {
    queryInterface.addveColumn('users', 'updated_at');
    return queryInterface.addveColumn('users', 'created_at',
    {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: false,
    },
  );
  },
};