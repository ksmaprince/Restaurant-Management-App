const express = require('express');
const userController = require('../controllers/UserController');

const userRouter = express.Router();

userRouter.post('/login', userController.login)

userRouter.post("/signup", userController.signupUser)

module.exports = userRouter