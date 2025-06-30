const User = require("../modals/Usermodal");
const bcrypt = require("bcryptjs");

const getUserController = async (req, res) => {
  try {
    const id = req.userId;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // hide password
    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in get api",
      error: error.message,
    });
  }
};

const updateUserController = async (req, res) => {
  const { username, email, phone } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.userId, {
      username,
      email,
      phone,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user update api error",
      error: error.message,
    });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Please provide old or new password",
        });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res
        .status(500)
        .json({ success: false, message: "Old password did not matched" });
    }
    const salt = await bcrypt.genSaltSync(10);

    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await User.findByIdAndUpdate(req.userId, { password: hashedPassword });

    return res
      .status(200)
      .json({ success: true, message: "Password is updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Error in password update api",
        error: error.message,
      });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;

    if (!email || !newPassword || !answer) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Please provide all required details",
        });
    }

    const user = await User.findOne({ email, answer });
    if (!user) {
      return res
        .status(500)
        .json({ success: false, message: "User is not registered" });
    }
    if (!(user.answer === answer)) {
      return res
        .status(500)
        .json({ success: false, message: "invalid answer" });
    }
    const salt = bcrypt.genSaltSync(10);
    //TODO: temporary taking answer as authentication step instead of email verification
    if (user.answer === answer) {
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "User password is reset successfully",
        user,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Reset password api error ",
        error: error.message,
      });
  }
};

const deleteProfile = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res
        .status(500)
        .json({ success: false, message: "User does not exist" });
    }

    return res
      .status(200)
      .json({ success: true, message: "user deleted successfuly", user });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Error in delete API",
        error: error.message,
      });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updateUserPassword,
  resetPassword,
  deleteProfile,
};
