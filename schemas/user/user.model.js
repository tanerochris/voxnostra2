import mongoose, { Schema } from 'mongoose';
import PasswordSchema from './password/password.schema';
import UserStatics from './user.statics';

const UserSchema = new Schema({
  name: String,
  email: {
    type: String, index: true, unique: true, required: true
  },

  password: { type: PasswordSchema, select: 0 }
});

UserSchema.statics = UserStatics;

const User = mongoose.model('User', UserSchema);

export default User;
