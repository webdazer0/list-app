const { Schema, model } = require('mongoose');

const TaskSchema = new Schema(
  {
    username: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = model('Task', TaskSchema);
