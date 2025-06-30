const express = require("express");
const {
  createFood,
  deleteFood,
  getAllFood,
  getSingleFood,
  getFoodByRestaurant,
} = require("../controllers/foodController");
const { Router } = express;

const router = Router();

router.post("/createFood", createFood);
router.delete("/deleteFood/:id", deleteFood);
router.get("/get-all-food", getAllFood);
router.get("/get-food/:id", getSingleFood);
router.get("/getFoodByRestaurant/:id", getFoodByRestaurant);

module.exports = router;