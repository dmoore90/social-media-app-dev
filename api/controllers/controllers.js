const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateJWT = require('../security/authenticateJWT');
const formValidation = require('./formValidation');

exports.postRegister = (req, res) => {

	const first_name = formValidation.validateName(req.body.first_name);
	const last_name = formValidation.validateName(req.body.last_name);
	const email = formValidation.validateEmail(req.body.email);
	const username = formValidation.validateName(req.body.username);
	const password = req.body.password;
	const pass_confirmation = req.body.pass_confirmation;

	if (formValidation.validatePassword(password, pass_confirmation)) {
		const hashedPassword = bcrypt.hashSync(password, 10);
		User.create({
			first_name: first_name,
			last_name: last_name,
			email: email,
			username: username,
			password: hashedPassword
		})
		.then(result => {
			return res.sendStatus(200);
		}).catch(err => { 
			console.log(err);
			return res.sendStatus(400); 
		});
	} else {
		return res.sendStatus(400);
	}
}

exports.postLogin = (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	User.findOne({ where: { username: username } })
		.then(user => {
			if (!user) {
				return res.sendStatus(401);
			}
			bcrypt.compare(password, user.password)
				.then(success => {
					if (success) {
			        	const token = jwt.sign({ 
			        		id: user.dataValues.id, 
			        		username: user.username, 
			        		first_name: user.dataValues.first_name,
			        		last_name: user.dataValues.last_name 
			        	}, JWT_KEY.secret, { expiresIn: "1h" });
						res.cookie('auth', token, { httpOnly: true, secure: true, sameSite: true });
						return res.sendStatus(200);
					} else {
						return res.sendStatus(401);
					}
				})
				.catch(err => {
					console.log(err);
				})
		})
}

exports.postLogout = (req, res) => {
	res.clearCookie('auth');
	return res.sendStatus(200);
}

exports.getProfile = (req, res) => {
	const username = req.user.username;
	Post.findAll({ where: { userId: req.user.id }})
	.then(posts => {
		return res.status(200).json({
			posts: posts, 
			username: req.user.username, 
			first_name: req.user.first_name, 
			last_name: req.user.last_name
		});
	})
	.catch(err => {
		console.log(err);
		return res.sendStatus(500);
	})
}

exports.createPost = (req, res) => {
	Post.create({
		title: req.body.title,
		content: req.body.content,
		userId: req.user.id
	})
	.then(action => {
		return res.sendStatus(200);
	})
	.catch(err => {
		console.log(err);
		return res.sendStatus(500);
	})
}

exports.getPost = (req, res) => {
	Post.findByPk(req.params.id)
	.then(post => {
		return res.json(post);
	})
	.catch(err => {
		console.log(err);
		return res.sendStatus(500);
	})
}

exports.postUpdate = (req, res) => {
	Post.findByPk(req.body.id)
	.then(post => {
		post.title = req.body.title;
		post.content = req.body.content;
		return post.save();
	})
	.then(action => {
		return res.sendStatus(200);
	})
	.catch(err => {
		console.log(err);
		return res.sendStatus(500);
	})
}

exports.deletePost = (req, res) => {
	Post.destroy({ where: { id: req.body.id } })
	.then(action => {
		return res.sendStatus(200);
	})
	.catch(err => {
		console.log(err);
		return res.sendStatus(500);
	})
}

exports.getUserHome = (req, res) => {
	Post.findAll({
		include: [{
			model: User,
			required: false
		}]
	})
	.then(posts => {
		return res.json({
			posts: posts,
			cuser: req.user
		});
	})
	.catch(err => {
		console.log(err);
		return res.sendStatus(500);
	})
}