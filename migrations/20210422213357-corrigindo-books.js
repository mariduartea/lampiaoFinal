'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('books', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
    }) ;
    queryInterface.addColumn('books', 'img',{
      type: Sequelize.STRING,
      allowNull: true
    });
    return queryInterface.addColumn('books', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
  down: (queryInterface) => {
    queryInterface.removeColumn('books', 'updated_at');
    queryInterface.removeColumn('books', 'img');
    return queryInterface.removeColumn('books', 'created_at');
  },
};