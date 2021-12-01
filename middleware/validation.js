const { isValidObjectId } = require("../utils/validators");

const ensureValidObjectId = (type) => (req, res, next) => {
  if (!isValidObjectId(req.params[`${type}Id`])) {
    res.status(400);
    throw new Error(`Invalid ${type} id`);
  }
  next();
};

module.exports = { ensureValidObjectId };
