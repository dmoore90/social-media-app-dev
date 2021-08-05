const Sequelize = require('sequelize');
const connection = require('../db/connection_pool');

const Post = connection.define("posts", {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	title: {
		type: Sequelize.STRING(45),
		allowNull: false
	}
})

module.exports = Post;
