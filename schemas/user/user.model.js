import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      index: true,
      unique: true,
      required: true
    },
    phoneNumber: String,
    address: {
      town: String,
      country: String
    },
    organization: String
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
