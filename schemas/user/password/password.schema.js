import bcrypt from 'bcrypt';
import { Schema } from 'mongoose';
import { SALT_WORK_FACTOR } from '../../../libs/auth-helpers';
import PasswordMethods from './password.methods';

const PasswordSchema = new Schema({
  value: String,
  updatedAt: Date,

  newPasswordRequest: {
    date: Date,
    strategy: String,
    token: String
  },

  modifications: {
    type: [{ setDate: Date, strategy: String, requestDate: Date }],
    select: 0,
    _id: false
  }
}, {
  _id: false
});

PasswordSchema.pre('save', async function setPasswordPreSave(next) {
  this.updatedAt = new Date();

  try {
    // only harsh modified password - isModified
    if (this.isModified('value')) {
      // generate a salt
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

      // replacing clear-text with harsh
      // harsh the password along with our new salt
      this.value = await bcrypt.hash(this.value, salt);
    }
  } catch (error) {
    return next(error);
  }

  return next();
});

PasswordSchema.methods = PasswordMethods;

export default PasswordSchema;
