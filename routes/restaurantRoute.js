const express = require('express');
const { createRestaurant, getRestaurant, getRestaurantById, deleteRestaurantById } = require('../controllers/restaurantController');
const { checkAuth } = require('../middleware/authMiddleware');
const router = express.Router();

//create restaurant
router.post('/createRestaurant',createRestaurant);

//get all restaurant
router.get("/all-restaurant", getRestaurant);

//get restaurant by id
router.get("/restaurant-id/:id",getRestaurantById);

//delete restaurant by id
router.delete("/delete-restaurant/:id",checkAuth, deleteRestaurantById);


module.exports = router;