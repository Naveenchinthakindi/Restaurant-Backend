const express = require("express");
const {
  createFood,
  deleteFood,
  getAllFood,
  getSingleFood,
  getFoodByRestaurant,
  updateFood,
  placeOrder,
  updateOrderStatus,
} = require("../controllers/foodController");
const { checkAuth } = require("../middleware/authMiddleware");
const { Router } = express;

const router = Router();

router.post("/createFood", createFood);
router.delete("/deleteFood/:id", checkAuth, deleteFood);
router.get("/get-all-food", getAllFood);
router.get("/get-food/:id", getSingleFood);
router.get("/getFoodByRestaurant/:id", getFoodByRestaurant);
router.put("/updateFood/:id", checkAuth, updateFood);
router.post("/place-order",checkAuth, placeOrder);
router.put("/update-order/:id",checkAuth, updateOrderStatus);

module.exports = router;
