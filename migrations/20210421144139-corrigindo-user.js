'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('users', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
    }) ;
    return queryInterface.addColumn('users', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
  down: (queryInterface) => {
    queryInterface.removeColumn('users', 'updated_at');
    return queryInterface.removeColumn('users', 'created_at');
  },
};