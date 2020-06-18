const { Schema } = require('mongoose');

const MediaSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    filename: String,
    size: {
      type: String,
      required: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = MediaSchema;
