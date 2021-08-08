const express = require('express');
const controllers = require('../controllers/controllers');
const router = express.Router();
const authenticateJWT = require('../security/authenticateJWT');


router.post('/register', controllers.postRegister);
router.post('/login', controllers.postLogin);
router.post('/logout', controllers.postLogout);
router.get('/profile', authenticateJWT, controllers.getProfile);
router.post('/create_post', authenticateJWT, controllers.createPost);

module.exports = router;