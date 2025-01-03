const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registerUser = async function (req, res) {
  try {
    let { name, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user)
      return res.status(409).json({ message: "You are already registered" });
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    user = await userModel.create({
      name,
      email,
      password: hash,
    });
    let token = jwt.sign({ name, email }, process.env.JWT_KEY);
    res.cookie("token", token, {
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'None'
    });
    return res.status(201).json({ message: "Registration Successfull", token });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.loginUser = async function (req, res) {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "You are not registered" });
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign({ email, name: user.name }, process.env.JWT_KEY);
        res.cookie("token", token, {
          maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'None'
        });
        return res.status(200).json({ message: "Login Success", token, user });
      } else {
        return res.status(400).json({ message: "Invalid Password" });
      }
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.logoutUser = function (req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout Success" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getUserProfile = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};
