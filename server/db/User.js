

// user.js (or wherever you define your Mongoose models)
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  // Add other fields as needed
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true },
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;





