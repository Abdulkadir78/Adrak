import { isValidEmail } from "../utils/validation";

const signupSchema = {
  username: {
    required: { value: true, message: "Username is required" },
    minLength: {
      value: 3,
      message: "Username should be atleast 3 characters long",
    },
    maxLength: {
      value: 50,
      message: "Username cannot be more than 50 characters long",
    },
  },

  email: {
    required: { value: true, message: "Email is required" },
    validate: (value) => isValidEmail(value) || "Invalid email address",
  },

  password: {
    required: { value: true, message: "Password is required" },
    minLength: {
      value: 6,
      message: "Password should be atleast 6 characters long",
    },
  },

  confirmPassword: {
    required: { value: true, message: "Confirm password is required" },
  },
};

export default signupSchema;
