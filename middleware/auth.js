const jwt = require("jsonwebtoken");

const User = require("../db/models/User");

const ensureAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);
    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ error: "Please login to continue", success: false });
  }
};

module.exports = { ensureAuthenticated };
