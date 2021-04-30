'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('books', 'synopsis', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
  down: (queryInterface) => {
    
    return queryInterface.removeColumn('books', 'synopsis');
  },
};