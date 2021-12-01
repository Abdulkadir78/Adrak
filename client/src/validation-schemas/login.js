const loginSchema = {
  email: {
    required: { value: true, message: "Email is required" },
  },
  password: {
    required: { value: true, message: "Password is required" },
  },
};

export default loginSchema;
