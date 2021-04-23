'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'img', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
  down: (queryInterface) => {
    
    return queryInterface.removeColumn('users', 'img');
  },
};