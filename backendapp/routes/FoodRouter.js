const express = require('express');
const foodController = require('../controllers/FoodController');

const foodRouter = express.Router();

foodRouter.get('/users/:userId/foods', foodController.getAllFoods);

foodRouter.post('/users/:userId/foods', foodController.addNewFood);

foodRouter.put('/users/:userId/foods/:foodId', foodController.updateFood);

foodRouter.delete('/users/:userId/foods/:foodId', foodController.deleteFood)

module.exports = foodRouter
