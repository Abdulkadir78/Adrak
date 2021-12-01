const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
      maxlength: [200, "Title cannot be more than 200 characters long"],
    },
    body: {
      type: String,
      maxlength: [500, "Body cannot be more than 500 characters long"],
    },
    type: {
      type: String,
      lowercase: true,
      enum: {
        values: ["todo", "in_progress", "done"],
        message: "Type can only be one of 'todo', 'in_progress' or 'done'",
      },
      required: [true, "Task type is required"],
    },
    priority: {
      type: String,
      lowercase: true,
      enum: {
        values: ["low", "medium", "high"],
        message: "Priority can only be one of 'low', 'medium' or 'high'",
      },
      required: [true, "Priority is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
