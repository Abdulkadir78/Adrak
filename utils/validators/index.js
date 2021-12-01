const validator = require("validator");

const isValidEmail = (email) => validator.isEmail(email);
const isValidObjectId = (objectId) => validator.isMongoId(objectId);
const arePasswordsMatching = (password1, password2) => password1 === password2;

module.exports = { isValidEmail, isValidObjectId, arePasswordsMatching };
