const express = require('express');
const userController = require('../controllers/UserController');

const userProfileRouter = express.Router();

userProfileRouter.put("/users/:userId", userController.updateProfile)

userProfileRouter.put("/users/:userId/images", userController.updateProfileImage)

userProfileRouter.put("/users/:userId/changePassword", userController.changePassword)

module.exports = userProfileRouter