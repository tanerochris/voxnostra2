import { Schema } from 'mongoose';

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

export default MediaSchema;
