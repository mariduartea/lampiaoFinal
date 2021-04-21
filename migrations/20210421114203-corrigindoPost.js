'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('posts', 'is_it_public',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    );
  },
  down: (queryInterface) => {
    return queryInterface.removeColumn('posts', 'is_it_public');
  },
};
