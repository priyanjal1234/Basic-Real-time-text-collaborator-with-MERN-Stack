const jwt = require("jsonwebtoken");

module.exports.isLoggedin = function (req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(404).json({ message: "Token not found" });
  else {
    try {
      let data = jwt.verify(token, process.env.JWT_KEY);
      req.user = data;
      next();
    } catch (error) {
      console.log(error.message);
    }
  }
};
