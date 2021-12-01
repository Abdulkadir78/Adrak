const taskSchema = {
  title: {
    required: { value: true, message: "Title is required" },
    maxLength: {
      value: 200,
      message: "Title cannot be more than 200 characters long",
    },
  },
  body: {
    maxLength: {
      value: 500,
      message: "Body cannot be more than 500 characters long",
    },
  },
};

export default taskSchema;
