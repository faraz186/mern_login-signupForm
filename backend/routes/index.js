const express = require('express');
const SignupController = require('../controllers/SignupController.js');
const loginController = require('../controllers/loginController.js');
const router = express.Router();
const app = express();

app.use(express.json());

router.post('/api/signup',SignupController);
router.post('/api/login',loginController);


module.exports = router
