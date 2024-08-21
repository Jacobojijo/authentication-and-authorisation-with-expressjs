const jwt = require("jsonwebtoken");
require("dotenv").config();
const config = process.env;

const tokenVerification = (req, res, next) => {
  let token = req.signedCookies.user?.token;
  if (!token) {
    return res.status(403).send({
      auth: false,
      message: "Token is not provided.",
      status: 403
    });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log("Failed to authenticate token.");
    return res.status(401).send({
      auth: false,
      message: "Failed to authenticate token.",
      status: 401
    });
  }
};

module.exports = tokenVerification;