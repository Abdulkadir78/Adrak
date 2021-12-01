import isEmail from "validator/lib/isEmail";

const isValidEmail = (email) => isEmail(email);

export { isValidEmail };
