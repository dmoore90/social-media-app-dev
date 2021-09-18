'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('post', { 
        id: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        title: {
          type: Sequelize.STRING(45),
          allowNull: false
        },
        content: {
          type: Sequelize.STRING(300),
          allowNull: false
        },
        userId: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          references: {
            model: 'user',
            key: 'id'
          }
        }
      },
      {
        freezeTableName: true
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('post');
  }
};
