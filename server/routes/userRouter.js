const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.post('/sign-up', UserController.signUp);

module.exports = router;