const { Schema, model } = require("mongoose");

const Excercises = new Schema(
  {
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Excercises", Excercises);
