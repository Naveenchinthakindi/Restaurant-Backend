const JWT = require("jsonwebtoken");

//check authentication
const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ message: "User is not authenticated" });
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(403).json({ message: "user is not authenticated" });
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Token is not valid", err: err });
      } else {
        console.log("decode ", decode);
        req.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Auth API",
      error: error.message,
    });
  }
};

module.exports = { checkAuth };
