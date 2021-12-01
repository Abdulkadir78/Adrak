const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
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

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
