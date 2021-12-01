const projectSchema = {
  name: {
    required: { value: true, message: "Name is required" },
    maxLength: {
      value: 50,
      message: "Name cannot be more than 50 characters long",
    },
  },
  description: {
    maxLength: {
      value: 500,
      message: "Description cannot be more than 500 characters long",
    },
  },
};

export default projectSchema;
