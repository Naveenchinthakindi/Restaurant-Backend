const User = require("../modals/Usermodal");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const JWT = require("jsonwebtoken");

//create a user
const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address, answer } = req.body;
    //validation
    if (!username || !email || !password || !phone || !address || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    //check user exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "Email is already Registered please login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      answer
    });

    res
      .status(200)
      .send({ success: true, message: "Successfully Registered", user });
  } catch (error) {
    console.error("User Create Error: ", error);
    // res.status(500).json({ message: error.message });
    res
      .status(500)
      .send({ success: false, message: "Error in register api", error });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide Email and Password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    const hashedPassword = user.password;
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    user.password = undefined;

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).send({
      success: true,
      message: "logged In successfully",
      user,
      token,
    });
  } catch (error) {
    console.log("error ", error);
    return res.status(500).send({
      success: false,
      message: "User Login Error",
      error: error.message,
    });
  }
};

module.exports = { registerController, loginController };
