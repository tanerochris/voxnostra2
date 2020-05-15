import mongoose, { Schema } from 'mongoose';
import PasswordSchema from './password/password.schema';
import UserStatics from './user.statics';

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    index: true,
    unique: true,
    required: true,
    validate: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Must be a valid email address.'
    ]
  },
  password: { type: PasswordSchema, select: 0 }
});

UserSchema.statics = UserStatics;
delete mongoose.connection.models.User;

const User = mongoose.model('User', UserSchema);

export default User;
