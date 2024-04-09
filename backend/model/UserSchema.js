const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: { type: String, required: true, trim: true },
    website: { type: String, required: true, trim: true },
    termsAndConditions: { type: Boolean, required: true, default: true },
    pin: { type: Number, require: true },
  },
  { timestamps: true }
);

const UserSchema = mongoose.model("user", userSchema);

module.exports = UserSchema;
