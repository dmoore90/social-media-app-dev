const Sequelize = require('sequelize');
const connection = require('../db/connection_pool');
const User = require('./User');

const Post = connection.define("post", {
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
      allowNull: false
    }
}, {
	freezeTableName: true
})

// Post.associate = (models) => {
// 	Post.belongsTo(models.User, {foreignKey: 'id'})
// }

module.exports = Post;
