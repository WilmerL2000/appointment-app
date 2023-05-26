import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { uid } from 'uid';

const vetSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    default: '',
    trim: true,
  },
  webPage: {
    type: String,
    default: '',
  },
  token: {
    type: String,
    default: uid(25),
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
});

/* This code is a pre-save hook in the Mongoose schema for the `Vet` model. It is executed before
saving a new `Vet` document to the database. */
vetSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

/* `vetSchema.methods.checkPassword` is a method added to the `vetSchema` schema using the `methods`
property. This method is used to compare the password entered by the user with the hashed password
stored in the database. It takes a `passwordForm` parameter which is the password entered by the
user and returns a promise that resolves to a boolean value indicating whether the password matches
the hashed password or not. It uses the `bcrypt.compare()` method to compare the passwords. */
//!This is how you add a method to the schema
vetSchema.methods.checkPassword = async function (passwordForm) {
  return await bcrypt.compare(passwordForm, this.password);
};

const Vet = mongoose.model('Vet', vetSchema);

export default Vet;
