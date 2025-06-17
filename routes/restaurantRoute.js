const express = require('express');
const { createRestaurant, getRestaurant, getRestaurantById, deleteRestaurantById } = require('../controllers/restaurantController');
const router = express.Router();

router.post('/createRestaurant',createRestaurant);

router.get("/all-restaurant", getRestaurant);

router.get("/restaurant-id/:id",getRestaurantById);

router.delete("/delete-restaurant/:id",deleteRestaurantById)

module.exports = router;