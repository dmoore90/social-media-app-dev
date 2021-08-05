const Sequelize = require('sequelize');

const connection_pool = new Sequelize("social_media_db", "user", "pass", {
	host: "localhost",
	dialect: "mysql",
	define: {
		timestamps: false
	}
});

module.exports = connection_pool;