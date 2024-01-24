// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     }
//     // Other fields as needed...
// });

// userSchema.plugin(passportLocalMongoose);

// module.exports = mongoose.model("users", userSchema);

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





