const express = require("express");
const { checkAuth } = require("../middleware/authMiddleware");
const {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const { Router } = express;
const router = Router();

//create a category
router.post("/create-cat", checkAuth, createCategory);

//get all category
router.get("/getall-cat", getAllCategory);

//update the category
router.put("/update-cat/:id", checkAuth, updateCategory);

//delete category
router.delete("/delete-cat/:id", checkAuth, deleteCategory);

module.exports = router;
