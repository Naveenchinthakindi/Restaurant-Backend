const express = require('express');
const { createRestaurant } = require('../controllers/restaurantController');
const router = express.Router();

router.post('/createRestaurant',createRestaurant);

module.exports = router;