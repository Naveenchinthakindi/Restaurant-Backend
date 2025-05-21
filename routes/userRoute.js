const express = require("express");
const router = express.Router();
const { getUserController, updateUserController, updateUserPassword, resetPassword, deleteProfile } = require("../controllers/userController");
const { checkAuth } = require("../middlewears/authMiddleware");

router.get("/getUser", checkAuth, getUserController);

router.put("/updateUser", checkAuth, updateUserController);

router.post("/updatePassword", checkAuth, updateUserPassword);

router.post("/resetPassword", resetPassword);

router.delete("/deleteUser/:id",checkAuth, deleteProfile)

module.exports = router;