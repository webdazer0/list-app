const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
    // versionKey: false,
    // key hidden in API
    toJSON: {
      versionKey: false,
    },
  }
);

module.exports = model('User', UserSchema);
