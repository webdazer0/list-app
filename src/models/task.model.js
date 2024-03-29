const { Schema, model } = require('mongoose');

const TaskSchema = new Schema(
  {
    username: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    done: { type: Boolean, required: true },
    date: { type: Date, required: true },
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

module.exports = model('Task', TaskSchema);
