const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { isValidEmail } = require("../../utils/validators");
const invitationsSchema = require("../nested-schemas/invitations");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      minlength: [3, "Username cannot be less than 3 characters"],
      maxlength: [50, "Username cannot be more than 50 characters long"],
      required: [true, "Username is required"],
    },
    username_lower: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, "Email is required"],
      validate: {
        validator(value) {
          return isValidEmail(value);
        },
        message: "Invalid email",
      },
    },
    password: {
      type: String,
      minlength: [6, "Password should be atleast 6 characters long"],
      required: [true, "Password is required"],
      select: false,
    },
    profile_color: {
      type: String,
      required: true,
    },
    profile_url: String,
    cloud_profile_id: String,
    invitations: [invitationsSchema],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 8);

  next();
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.invitations;
  return user;
};

userSchema.methods.isPasswordCorrect = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  return token;
};

userSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
