'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Accounts','CustomerId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Customers'
        },
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Accounts', 'CustomerId',{})
  }
};
